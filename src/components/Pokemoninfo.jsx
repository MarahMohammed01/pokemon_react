import React from "react";
const Pokemoninfo = ({ data }) => {
    //console.log('Received data:', data);
    return (
        <>
            {
                (!data) ? "" : (
                    <>
                        <div id="app">
                            <div className="containerPokeinfo">
                                <div className="number">#{data.id}</div>

                                <div className="content">
                                    <div>
                                        <div className="title">
                                            <div className="subgrid">
                                                <div className="type">{data.types.type}</div>
                                                <div className="name">{data.name}</div>
                                                <div className="details">
                                                    <div className="row">
                                                        <span>Height</span>
                                                        <span>{data.height}</span>
                                                    </div>
                                                    <div className="row">
                                                        <span>Weight</span>
                                                        <span>{data.weight}</span>
                                                    </div>
                                                    <div className="row" >
                                                        <span>Abilities</span>
                                                        <span> {
                                                            data.abilities.map((poke, index) => (
                                                                <React.Fragment key={index}>
                                                                    {index > 0 && " | "} 
                                                                    {poke.ability.name}
                                                                </React.Fragment>
                                                            ))
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="picture">
                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />

                                            </div>
                                        </div>

                                        <div className="stats" style={{ marginTop: '0px', opacity: 1 }}>
                                            <div className="title">Stats</div>
                                            <div className="graphics">
                                                {
                                                    data.stats.map(poke => {
                                                        return (
                                                            <>
                                                                <div className="row">
                                                                    <div className="name">{poke.stat.name}</div>
                                                                    <div className="bar">
                                                                        <div className="inside" style={{ width: `${(poke.base_stat / 255) * 100}%` }}></div>
                                                                    </div>
                                                                    <div className="base">{poke.base_stat}</div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </>
                )}

        </>
    )
}

export default Pokemoninfo;