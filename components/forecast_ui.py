import streamlit as st
import pandas as pd
import plotly.express as px
from utils.forecasting import (
    forecast_sales,
    get_forecast_confidence_level,
    get_model_quality_description,
    get_forecast_accuracy_description,
    calculate_reliability_score
)

# Main Forecasting UI

def render_forecast_tab(df):
    st.header("📈 Demand Forecasting")
    st.subheader("Filter and Generate Forecast")

    # Country filter
    country_list = sorted(df["Country"].dropna().unique())
    selected_countries = st.multiselect("Select Country", options=country_list, default=country_list)

    # Product Group filter
    product_list = sorted(df["Product Group"].dropna().unique())
    selected_products = st.multiselect("Select Product Group", options=product_list, default=product_list)

    # Debug toggle
    show_debug = st.checkbox("Show debug info", value=False, key="debug_info")

    # Generate Forecast button
    if st.button("Generate Forecast", key="generate_forecast_btn"):
        with st.spinner("Generating forecast..."):
            # Filter data
            filtered_df = df[df["Country"].isin(selected_countries) & df["Product Group"].isin(selected_products)]
            if filtered_df.empty:
                st.warning("No data for selected Country(ies) & Product Group(s)")
                return

            # Forecast
            label = f"{' + '.join(selected_countries)} | {' + '.join(selected_products)}"
            if show_debug:
                sales_data, forecast, metrics, debug_info = forecast_sales(filtered_df, "Country", selected_countries[0], debug=True)
                display_forecast_results(sales_data, forecast, metrics, label, debug_info)
            else:
                sales_data, forecast, metrics = forecast_sales(filtered_df, "Country", selected_countries[0])
                display_forecast_results(sales_data, forecast, metrics, label)

            # Additional tables
            display_top_manufacturing_sites(filtered_df)
            display_top_vendors(filtered_df)
            display_sites_and_vendors(filtered_df)
            display_monthly_trend_seasonality(filtered_df)


# Display forecast results and charts

def display_forecast_results(sales_data, forecast, metrics, label, debug_info=None):
    # Debug info
    if debug_info:
        with st.expander("Debug Information", expanded=True):
            st.subheader("Debug Info")
            for key, value in debug_info.items():
                st.text(f"{key}: {value}")

    # Error handling
    if sales_data is None or metrics.get("error"):
        err = metrics.get("error")
        if err:
            st.error(f"Error: {err}")
        else:
            st.warning("Insufficient data to generate forecast.")
        return

    # Plot actual vs forecast
    result_df = pd.concat([sales_data, forecast.to_frame("Forecast")], axis=1)
    fig = px.line(result_df, y=[sales_data.columns[0], "Forecast"], title=f"Forecast for {label}")
    fig.update_layout(xaxis_title="Date", yaxis_title=sales_data.columns[0], hovermode="x unified")
    st.plotly_chart(fig, use_container_width=True)

    # Metrics and details
    display_metrics(metrics)
    display_forecast_statistics(sales_data, forecast)
    display_forecast_details(forecast)
    display_confidence_indicator(sales_data, metrics.get('reliability_score'))
    display_model_details(metrics)

# Model performance metrics

def display_metrics(metrics):
    st.subheader("Model Performance Metrics")
    cols = st.columns(4)
    names = ["RMSE", "MAE", "MAPE", "R2"]
    for col, name in zip(cols, names):
        val = metrics.get(name)
        disp = (f"{val:.2f}%" if name == 'MAPE' and val is not None else f"{val:.2f}" if val is not None else "N/A")
        col.metric(name, disp)

# Forecast statistics display

def display_forecast_statistics(sales_data, forecast):
    st.subheader("Forecast Statistics")
    hist_mean = sales_data.iloc[:, 0].mean()
    fore_mean = forecast.mean()
    c1, c2 = st.columns(2)
    c1.metric("Avg Weekly Demand", f"{hist_mean:.0f}", delta=f"{(fore_mean - hist_mean):.0f}")
    growth = ((fore_mean / hist_mean) - 1) * 100 if hist_mean else 0
    c2.metric("Growth", f"{growth:.1f}%", delta=f"{growth:.1f}%")

# Forecast details table

def display_forecast_details(forecast):
    st.subheader("Forecast Details")
    df = forecast.to_frame("Forecasted Quantity")
    df.index = df.index.strftime('%b %d, %Y')
    st.dataframe(df.astype(int))

# Confidence indicator

def display_confidence_indicator(sales_data, reliability):
    level, color = get_forecast_confidence_level(len(sales_data), reliability)
    st.markdown(f"**Forecast Confidence:** <span style='color:{color};'>{level}</span>", unsafe_allow_html=True)

# Model details expander

def display_model_details(metrics):
    with st.expander("Model Details"):
        params = metrics.get('model_params')
        if params:
            st.write(params.get('description', ''))
            st.code(f"order={params['order']}, seasonal_order={params['seasonal_order']}")
        acc_desc, status = get_forecast_accuracy_description(metrics.get('MAPE'))
        getattr(st, status)(acc_desc)

# Top 5 Manufacturing Sites by Quantity

def display_top_manufacturing_sites(filtered_df):
    st.subheader("Top 5 Manufacturing Sites by Total Quantity")
    df_site = filtered_df.dropna(subset=["Manufacturing Site", "Line Item Quantity"])
    stats = df_site.groupby("Manufacturing Site")["Line Item Quantity"].sum().nlargest(5).reset_index()
    stats.columns = ["Manufacturing Site", "Total Quantity"]
    st.table(stats)

# Top 5 Vendors by Quantity, Deliveries, On-time Delivery (%), and Avg Freight Cost (USD)

def display_top_vendors(filtered_df):
    st.subheader("Top 5 Vendors by Quantity, Deliveries, On-time Delivery (%) & Avg Freight Cost (USD)")
    df_vendor = (
        filtered_df.dropna(
            subset=["Vendor", "Line Item Quantity", "Scheduled Delivery Date", "Delivered to Client Date", "Freight Cost (USD)"]
        )
        .assign(
            Scheduled=lambda d: pd.to_datetime(d["Scheduled Delivery Date"], errors='coerce'),
            Delivered=lambda d: pd.to_datetime(d["Delivered to Client Date"], errors='coerce')
        )
        .dropna(subset=["Scheduled", "Delivered"])
    )
    df_vendor["On Time"] = df_vendor["Delivered"] <= df_vendor["Scheduled"]

    # Aggregate
    vendor_stats = (
        df_vendor.groupby("Vendor").agg(
            Total_Quantity=("Line Item Quantity", "sum"),
            Deliveries=("Vendor", "count"),
            OnTimePct=("On Time", "mean"),
            Avg_Freight=("Freight Cost (USD)", "mean")
        )
        .nlargest(5, "Total_Quantity")
        .reset_index()
    )
    vendor_stats["On-time Delivery (%)"] = (vendor_stats["OnTimePct"] * 100).round(1)
    vendor_stats["Avg Freight Cost (USD)"] = vendor_stats["Avg_Freight"].round(2)

    # Select and rename columns
    out = vendor_stats[["Vendor", "Total_Quantity", "Deliveries", "On-time Delivery (%)", "Avg Freight Cost (USD)"]]
    out.columns = ["Vendor", "Total Quantity", "Deliveries", "On-time Delivery (%)", "Avg Freight Cost (USD)"]
    st.table(out)

# Top 5 Manufacturing Sites with Vendors and Quantity

def display_sites_and_vendors(filtered_df):
    st.subheader("Top 5 Sites with Vendors and Total Quantity")
    df_combined = filtered_df.dropna(subset=["Manufacturing Site", "Vendor", "Line Item Quantity"])
    top_sites = df_combined.groupby("Manufacturing Site")["Line Item Quantity"].sum().nlargest(5).index
    df_top = df_combined[df_combined["Manufacturing Site"].isin(top_sites)]
    combined = (
        df_top.groupby(["Manufacturing Site", "Vendor"])["Line Item Quantity"]
             .sum()
             .reset_index()
    )
    combined.columns = ["Manufacturing Site", "Vendor", "Total Quantity"]
    combined = combined.sort_values(by=["Manufacturing Site", "Total Quantity"], ascending=[True, False])
    st.table(combined)

def display_monthly_trend_seasonality(filtered_df):
    st.subheader("📈 Monthly Seasonality: Avg Deliveries per Month")

    if "Delivered to Client Date" not in filtered_df.columns:
        st.warning("Delivered date not found in data.")
        return

    filtered_df["Delivered to Client Date"] = pd.to_datetime(
        filtered_df["Delivered to Client Date"], errors='coerce'
    )
    filtered_df = filtered_df.dropna(subset=["Delivered to Client Date"])

    # Extract Year-Month and separate Month for ordering
    filtered_df["Month_Num"] = filtered_df["Delivered to Client Date"].dt.month
    filtered_df["Month"] = filtered_df["Delivered to Client Date"].dt.month_name()

    # Group by Year & Month_Num to get counts per month-year
    month_year_counts = (
        filtered_df.groupby(["Month_Num", "Month", filtered_df["Delivered to Client Date"].dt.year])
        .size()
        .reset_index(name="Deliveries")
    )

    # Now average deliveries across years per Month
    seasonal_avg = (
        month_year_counts.groupby(["Month_Num", "Month"])["Deliveries"]
        .mean()
        .reset_index(name="Avg Deliveries")
        .sort_values("Month_Num")
    )

    fig = px.line(
        seasonal_avg,
        x="Month",
        y="Avg Deliveries",
        markers=True,
        title="Monthly Seasonality: Avg Deliveries per Month"
    )
    fig.update_layout(xaxis_title="Month", yaxis_title="Avg Deliveries", hovermode="x unified")
    st.plotly_chart(fig, use_container_width=True)


