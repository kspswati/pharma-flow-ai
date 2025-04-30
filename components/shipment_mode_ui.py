import streamlit as st
import pandas as pd
import plotly.express as px

# Import cleaning function
from utils.price_forecasting import clean_freight_cost_column_with_id_priority

def render_shipment_mode_tab(df):
    st.header("🚛 Shipment Mode Analysis")
    st.subheader("Analyze Freight Costs and Trends by Shipment Mode")

    # 🚛 Clean Freight Cost data
    filtered_df = clean_freight_cost_column_with_id_priority(df)

    # Fill missing values
    filtered_df["Shipment Mode"] = filtered_df["Shipment Mode"].fillna("Unknown")
    filtered_df["Freight Cost (USD)"] = filtered_df["Freight Cost (USD)"].fillna(0)
    filtered_df["Delivered to Client Date"] = pd.to_datetime(filtered_df["Delivered to Client Date"], errors="coerce")

    # ------------------------------------------------
    # 📋 Corrected KPI Metrics
    # ------------------------------------------------
    st.subheader("📋 Shipment Mode KPIs")

    total_shipments = len(filtered_df)
    mode_counts = filtered_df["Shipment Mode"].value_counts(normalize=True) * 100

    air_percentage = mode_counts.get("Air", 0) + mode_counts.get("Air charter", 0)
    ocean_percentage = mode_counts.get("Ocean", 0)
    truck_percentage = mode_counts.get("Truck", 0)
    unknown_percentage = 100 - (air_percentage + ocean_percentage + truck_percentage)

    col1, col2, col3, col4, col5 = st.columns(5)
    col1.metric("Total Shipments", f"{total_shipments}")
    col2.metric("Air (%)", f"{air_percentage:.1f}%")
    col3.metric("Ocean (%)", f"{ocean_percentage:.1f}%")
    col4.metric("Truck (%)", f"{truck_percentage:.1f}%")
    col5.metric("Unknown (%)", f"{unknown_percentage:.1f}%")

    st.divider()

    # ------------------------------------------------
    # 📦 Average Freight Cost by Shipment Mode (Bar Chart)
    # ------------------------------------------------
    st.subheader("📦 Average Freight Cost by Shipment Mode")

    mode_cost = (
        filtered_df.groupby("Shipment Mode")["Freight Cost (USD)"]
        .mean()
        .reset_index()
    )

    fig1 = px.bar(
        mode_cost,
        x="Shipment Mode",
        y="Freight Cost (USD)",
        color="Shipment Mode",
        text_auto=".2s",
        title="Average Freight Cost by Shipment Mode"
    )
    st.plotly_chart(fig1, use_container_width=True)

    st.divider()

    # ------------------------------------------------
    # 📈 Freight Cost Trend Over Time (One Line Per Shipment Mode)
    # ------------------------------------------------
    st.subheader("📈 Freight Cost Trends for Each Shipment Mode")

    df_time = (
        filtered_df.dropna(subset=["Delivered to Client Date"])
        .groupby([pd.Grouper(key="Delivered to Client Date", freq="W"), "Shipment Mode"])["Freight Cost (USD)"]
        .mean()
        .reset_index()
    )

    unique_modes = df_time["Shipment Mode"].unique()

    for mode in unique_modes:
        st.markdown(f"#### {mode} Shipments")
        mode_df = df_time[df_time["Shipment Mode"] == mode]

        fig_mode = px.line(
            mode_df,
            x="Delivered to Client Date",
            y="Freight Cost (USD)",
            title=f"Freight Cost Trend - {mode}",
        )
        fig_mode.update_layout(hovermode="x unified")
        st.plotly_chart(fig_mode, use_container_width=True)
