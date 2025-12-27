import { useState, useEffect } from 'react';

export const useVisitorData = () => {
    const [data, setData] = useState({
        ip: 'CONNECTING...',
        isp: 'ETH_LINK',
        city: 'UNKNOWN',
        loading: true
    });

    useEffect(() => {
        const fetchIP = async () => {
            try {
                // Using ipapi.co for free JSON data (rate limited but sufficient for personal site)
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('Failed to fetch');

                const json = await res.json();

                setData({
                    ip: json.ip || 'UNKNOWN',
                    isp: (json.org || json.isp || 'UNKNOWN').toUpperCase(),
                    city: (json.city || 'UNKNOWN').toUpperCase(),
                    loading: false
                });
            } catch (error) {
                console.error("Intel Fetch Failed:", error);
                setData(prev => ({ ...prev, loading: false, ip: 'TRACE_FAILED' }));
            }
        };

        fetchIP();
    }, []);

    return data;
};
