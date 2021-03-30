import React, { useState, createContext, useContext } from 'react';

const DetailContext = createContext({});

export function DetailProvider({ children }) {

    const [detail, setDetail] = useState('jorge');

    function changeDetail (detail) {
        setDetail(detail);
    };

    return(
        <DetailContext.Provider value = {{ detail, changeDetail }}>
            {children}
        </DetailContext.Provider>
    );

}

export function useDetail() {
    const context = useContext(DetailContext);
    return context;
}
