import React, { useState, useEffect, useRef } from 'react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [content, setContent] = useState('');
    const cache = useRef({});

    useEffect(() => { 
        const fetchData = async (tab) => {
            if (cache.current[tab]) {
                setContent(cache.current[tab]);
                return;
            }
            
            try {
                const response = await fetch('/api');
                console.log('response:', response.body);
                const data = await response.text();
                const plaintext = data.replace(/<[^>]*>/g, '');

                console.log('data:', plaintext);
                cache.current[tab] = plaintext;
                console.log('cache:', cache.current);
                setContent(plaintext);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData(activeTab);
    }, [activeTab]);

    return (
        <div>
            <div className='flex justify-between bg-gray-800 text-white'>
                {[1, 2, 3, 4].map(tab => (
                    <div 
                        key={tab} 
                        onClick={() => setActiveTab(tab)} 
                        className={`border-b-2 ${activeTab != tab? 'hover:bg-gray-700' : '' }  border-black py-4 ${activeTab === tab ? 'bg-hover_color' : ''} flex justify-center items-center cursor-pointer flex-1 ${activeTab === tab ? 'bg-gray-600' : ''}`}
                    >
                        <p>Tab {tab}</p>
                    </div>
                ))}
            </div>
            <div className='bg-white px-12 py-24'>
                <h1 className='text-2xl'>Title {activeTab}</h1>
                <p className='text-lg'>{content || "Loading..."}</p>
            </div>
        </div>
    );
}

export default Tabs;
