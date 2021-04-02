import React, { useState, createContext, useContext } from 'react';
import { api } from '../services/api';

const DetailContext = createContext({});

const destaques = [
    {
        id: 52861,
        name: "Penault Butter"
    },
    {
        id: 52990,
        name: "Christmas cake"
    },
    {
        id: 52923,
        name: "Canadian Butter Tarts"
    },
    {
        id: 52913,
        name: "Brie wrapped in prosciutto & brioche"
    },
    {
        id: 52831,
        name: "Chicken Karaage"
    },
    {
        id: 52979,
        name: "Bitterballen (Dutch meatballs)"
    },
    {
        id: 52932,
        name: "Pouding chomeur"
    },
    {
        id: 52884,
        name: "Lancashire hotpot"
    },
    {
        id: 52791,
        name: "Eton Mess"
    },
    {
        id: 52771,
        name: "Spicy-Arrabiata-Penne"
    },
]

export function DetailProvider({ children }) {

    const [detail, setDetail] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getDestaques = async () => {
        const detailAux = [];

        const response = destaques.map( async (recommended)  => {
            const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recommended.id}`) 
            detailAux.push( data );
        })
        Promise.all(response).then( () => {
            setDetail(detailAux);
            setLoaded(true);
            //console.log(detailAux);
        } )
    }

    return(
        <DetailContext.Provider value = {{ detail, getDestaques, loaded }}>
            {children}
        </DetailContext.Provider>
    );

}

export function useDetail() {
    const context = useContext(DetailContext);
    return context;
}
