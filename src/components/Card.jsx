import React from 'react';
const Card=({pokemon,loading,pokeInfo })=>{
    //console.log(pokemon)
    return(
        <>
        {
            loading ? <h1>Loading...</h1>:
            pokemon.map((item)=>{
                return(
                    <>
                        <div className="pokeBall" key={item.id} onClick={()=>pokeInfo (item)}>
                            <div className="half-ball top-half"></div>
                            <div className="black-bar"></div>
                            <div className="center-circle center-circle-outer">
                                <img src={item.sprites.front_default} alt="" />
                            </div>
                            <div className="half-ball bottom-half"></div>
                            <div className="middle">
                                <div className="text">{item.name}</div>
                            </div>
                        </div>
                    </>
                )
            })
        }    
        </>
    )
}

export default Card;