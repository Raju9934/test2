import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'; // Import your CSS file for styling (if needed)
import './search-bar.css';
import './footer2.css';
import './scroll.css';
import { toast } from "react-toastify";

function Home({ xValue }) {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9092/get-product')
            .then((res) => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch((err) => {
                setData([]);
            });
    }, []);

    const handleCart = (x) => {
        console.log(x);
        var data = { cust_id: localStorage.getItem('uid'), p_data: x };

        console.log("cust_id:", localStorage.getItem('uid'));

        axios.post('http://localhost:9092/add-to-cart', data)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err.response.message);
            });
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

   
    const filteredData = data.filter(item =>
        item.p_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
       
        const intervalId = setInterval(() => {
            setScrollPosition((prevPosition) => (prevPosition + 1) % filteredData.length);
        }, 5000);

     
        return () => clearInterval(intervalId);
    }, [filteredData.length]);

    return (
        <div className="home-container" style={{ backgroundColor: '#FFCD9E' }}>
            <center><h2> </h2></center>

            {/* Search Bar */}
            <center>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </center>
            <div className="product-item" style={{ backgroundColor: 'white', display: 'flex', alignItems: 'flex-start' }}>
    <img className="product-image" src="apple.png" alt="Mobile" width="200" height="200" />
    <div className="product-details">
        <p>Mobile</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>

    <img className="product-image" src="laptop.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Electronic</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="charger.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Charger</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="headphone.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Headphone</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="airpod1.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Airpod</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="cover.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Acceseries</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="monitor.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Desktop</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="Tv.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Smart Tv</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>
    <img className="product-image" src="projector.png" alt="Electronic" width="200" height="200" />
    <div className="product-details">
        <p>Projector</p>
        {/* Add other product details here */}
        <button>{/* Add your button logic here */}</button>
    </div>

</div>

<br></br>
            {/* Image Carousel */}
            <div className="scroll-container" style={{ transform: `translateX(-${scrollPosition * 200}px)` }}>
                {filteredData.map((item, index) => (
                    <div key={index}>
                        <img src={item.p_img} alt={item.p_name} width="200" height="200" />
                    </div>
                ))}
            </div>

            <div className="product-container">
                {filteredData.map((d, i) => (
                    <div key={i} className="product-item" style={{ backgroundColor: 'white' }}>
                        <img src={d.p_img} alt={d.p_name} />
                        <div className="product-details">
                            <p>{d.p_name}</p>
                            <p>{d.p_price}</p>
                            <p>{d.p_cat}</p>
                            <button onClick={() => { handleCart(d) }}>Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Location</h3>
                        <p>Near Gupta Niwas Jugsalai 831006</p>
                        <p><img src="call.png" alt="Facebook" style={{ margin: '10px' }} />7061660877</p>
                    </div>
                    <div className="footer-section">
                        <h3>Social Media</h3>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src="insta.png" alt="Instagram" style={{ margin: '10px' }} />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img src="facebook.png" alt="Facebook" style={{ margin: '10px' }} />
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                <img src="youtube.png" alt="YouTube" style={{ margin: '10px' }} />
                            </a>
                        </div>
                    </div>
                </div>
                <p>&copy Minor project By B.tech(CSE) 20-24 Batch Raju kumar, Rohit Roy, Jugal soni and Deepika kumari <span>Arka Jain University</span> (AJU)</p>
            </footer>
        </div>
    );
}

export default Home;
