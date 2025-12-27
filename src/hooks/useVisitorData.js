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
                // Primary: ipapi.co
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error('Primary API failed');
                const json = await res.json();

                setData({
                    ip: json.ip || 'UNKNOWN',
                    isp: (json.org || json.isp || 'UNKNOWN').toUpperCase(),
                    city: (json.city || 'UNKNOWN').toUpperCase(),
                    loading: false
                });
            } catch (err1) {
                console.warn("Primary IP Fetch failed, trying fallback...", err1);

                try {
                    // Fallback: ipwho.is (No key required, HTTPS supported)
                    const res = await fetch('https://ipwho.is/');
                    if (!res.ok) throw new Error('Fallback API failed');
                    const json = await res.json();

                    if (!json.success) throw new Error('Fallback API returned error');

                    setData({
                        ip: json.ip || 'UNKNOWN',
                        isp: (json.connection?.isp || json.isp || 'UNKNOWN').toUpperCase(),
                        city: (json.city || 'UNKNOWN').toUpperCase(),
                        loading: false
                    });
                } catch (err2) {
                    console.error("All IP Fetches Failed:", err2);
                    setData(prev => ({ ...prev, loading: false, ip: 'TRACE_FAILED' }));
                }
            }
        };

        fetchIP();
    }, []);

    return data;
};
