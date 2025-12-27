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
                // Hybrid Fetch: IP/ISP from ipwho.is,  City from ipapi.co
                const [ipwhoRes, ipapiRes] = await Promise.allSettled([
                    fetch('https://ipwho.is/'),
                    fetch('https://ipapi.co/json/')
                ]);

                let finalData = {
                    ip: 'UNKNOWN',
                    isp: 'UNKNOWN',
                    city: 'UNKNOWN'
                };

                // 1. Process IP/ISP Source (ipwho.is)
                if (ipwhoRes.status === 'fulfilled' && ipwhoRes.value.ok) {
                    try {
                        const json = await ipwhoRes.value.json();
                        if (json.success !== false) {
                            finalData.ip = json.ip || 'UNKNOWN';
                            finalData.isp = (json.connection?.isp || json.connection?.org || json.isp || 'UNKNOWN');
                        }
                    } catch (e) { console.warn("ipwho parse failed", e); }
                }

                // 2. Process Location Source (ipapi.co)
                if (ipapiRes.status === 'fulfilled' && ipapiRes.value.ok) {
                    try {
                        const json = await ipapiRes.value.json();
                        if (!json.error) {
                            finalData.city = json.city || 'UNKNOWN';

                            // Fallbacks if ipwho failed completely
                            if (finalData.ip === 'UNKNOWN') finalData.ip = json.ip || 'UNKNOWN';
                            if (finalData.isp === 'UNKNOWN') finalData.isp = (json.org || json.isp || 'UNKNOWN');
                        }
                    } catch (e) { console.warn("ipapi parse failed", e); }
                }

                setData({
                    ip: finalData.ip,
                    isp: finalData.isp.toUpperCase(),
                    city: finalData.city.toUpperCase(),
                    loading: false
                });

            } catch (error) {
                console.error("Hybrid Fetch Error:", error);
                setData(prev => ({ ...prev, loading: false, ip: 'TRACE_FAILED' }));
            }
        };

        fetchIP();
    }, []);

    return data;
};
