import React, { useEffect, useState } from 'react';
import Card from './Card';
import logoImage from '../pokeLogo2.png';
import axios from 'axios';
import Pokemoninfo from './Pokemoninfo';

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [selectedPokemon, setSelectedPokemon] = useState(null); // state for selected Pokemon
    const [modalDisplay, setModalDisplay] = useState('none'); // state for modal display

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPoke(res.data.results);
        setLoading(false);
    };

    const getPoke = async (res) => {
        const pokeDataArray = await Promise.all(res.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
        }));

        if (pokeDataArray.length > 0) {
            setPokeData((state) => {
                const newPokemon = pokeDataArray.filter(pokemon => !state.find(p => p.id === pokemon.id));
                const updatedState = [...state, ...newPokemon];
                updatedState.sort((a, b) => a.id > b.id ? 1 : -1);
                return updatedState;
            });
        }
    };

    const handlePokeInfo = (poke) => {
        setSelectedPokemon(poke); // set selected Pokemon
        setModalDisplay('block'); // display modal
    };

    const closeModal = () => {
        setModalDisplay('none'); // close modal
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        <>
            <div className='logo'>
                <img src={logoImage} alt="Logo" />
            </div>
            
            <div className='container'>
                <div className='cards'>
                    <Card pokemon={pokeData} loading={loading} pokeInfo={handlePokeInfo} />
                </div>

                <div className="btn-group">
                    {prevUrl && <button onClick={() => {
                        setPokeData([])
                        setUrl(prevUrl)
                    }}>Previous</button>}
                    {nextUrl && <button onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl)
                    }}>Next</button>}
                </div>
            </div>

            {/* Modal */}
            <div className="modal" style={{ display: modalDisplay }}>
                <div className="modal-content">
                    
                    <Pokemoninfo data={selectedPokemon} />
                    {/* <button onClick={closeModal}>Close</button> */}
                    <div onClick={closeModal} class="close-icon">✖</div>
                </div>
            </div>
        </>
    )
}

export default Main;
