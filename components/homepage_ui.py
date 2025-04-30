import streamlit as st

def render_homepage():
    st.markdown("""
        <h1 style='text-align: center; font-size: 3.5rem; color: #00b4d8;'>PharmaFlow</h1>
        <p style='text-align: center; font-size: 1.2rem;'>
            PharmaFlow is an AI-powered pharmaceutical supply chain intelligence platform. 
            It helps manufacturers, vendors, and stakeholders make informed decisions about forecasting, pricing, freight optimization, and analytics.
        </p>
        <h2 style='margin-top: 3rem;'>Our Services</h2>
    """, unsafe_allow_html=True)

    # Define services
    services = [
        ("🤖", "AI-Powered Chatbot", "Get instant answers about products, availability, pricing, and operational questions.", "chatbot"),
        ("📈", "Demand Forecasting", "Visual representation of predicted demand for various pharmaceutical products.", "forecast"),
        ("📊", "Data Visualization", "Interactive graphs showing vendor performance, distribution trends, and bottlenecks.", "visualization"),
        ("💰", "Price Prediction", "Predict future prices of medicines based on trends, demand, and supply.", "price"),
        ("🚛", "Shipment Mode Analysis", "Analyze how costs change by Air, Sea, and Land shipment modes.", "shipment"),
        ("📤", "Submit Record", "Submit new shipment records directly to the database.", "data_entry"),
        ("🚚", "Freight Cost Analysis", "Track and compare freight charges across modes and suppliers.", "freight")
    ]

    # Custom CSS
    st.markdown("""
        <style>
            .service-card {
                background-color: #00b4d8;
                color: white;
                padding: 1.5rem;
                margin: 1rem 0;
                border-radius: 1rem;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .service-card:hover {
                background-color: #009dc2;
                transform: scale(1.02);
            }
            .service-card h3 {
                margin: 0;
                font-size: 1.3rem;
                color: white;
            }
            .service-card p {
                margin-top: 0.3rem;
                color: white;
                font-size: 0.95rem;
            }
        </style>
    """, unsafe_allow_html=True)

    for emoji, title, desc, target in services:
        if st.button(f"{emoji} {title}", key=target):
            st.session_state.page = target
        st.markdown(f"""
            <div class='service-card' onclick="window.location.href='#{target}'">
                <h3>{emoji} {title}</h3>
                <p>{desc}</p>
            </div>
        """, unsafe_allow_html=True)
