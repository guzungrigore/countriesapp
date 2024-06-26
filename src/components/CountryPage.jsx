import {Link, useParams} from "react-router-dom";
import {useCountries} from "../hooks/useCountries.js";
import {useContext} from "react";
import {CountryContext} from "./context/countryContextComp.jsx";

export const CountryPage = () => {
    const {name} = useParams()
    const {isLoading, countries, errorMessage} = useCountries(`https://restcountries.com/v3.1/name/${name}`);
    const country = countries && countries[0];
    const {favourite, addFavourite, removeFavourite} = useContext(CountryContext);

    return (
        <div>


            <div>{isLoading && <p>Is loading...</p>}</div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            {country && (
                <div className={"single-country"}>
                    <div className={"single-country-nav"}>
                        <Link to={"/countriesapp/"} className={'back'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-arrow-left icon">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </Link>
                        {favourite.some(
                            (favCountry) => favCountry.name.common === country.name.common
                        ) ? (
                            <span className={"btn-favorite"} onClick={() => removeFavourite(country)}><svg className={"feather" +
                                " feather-heart icon-1"}
                                                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                                                           viewBox="0 0 24 24"
                                                                                                           fill="none"
                                                                                                           stroke="currentColor"
                                                                                                           strokeWidth="2"
                                                                                                           strokeLinecap="round"
                                                                                                           strokeLinejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                        ) : (
                            <span className={"btn-favorite"} onClick={() => addFavourite(country)}><svg className={"feather" +
                                " feather-heart icon-2"}
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        fill="none"
                                                                                                        stroke="currentColor"
                                                                                                        strokeWidth="2"
                                                                                                        strokeLinecap="round"
                                                                                                        strokeLinejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                        )}
                    </div>
                    <h1 className={"single-country-name"}>{country.name.common}</h1>
                    <div className={"single-country-information"}>
                        <div className={"single-country-info"}>
                            <p>Official Name: </p>
                            <h3>{country.name.official}</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Capital: </p>
                            <h3>{country.capital}</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Region: </p>
                            <h3>{country.region}</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Population: </p>
                            <h3>{country.population} People</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Native Language: </p>
                            <h3>{country.languages[Object.keys(country.languages)[0]]}</h3>
                        </div>
                    </div>
                    <img className={"img"} src={country.flags.png}/>

                    <div className={"single-country-info-last"}>
                        <p>Location: </p>
                        <a href={country.maps.googleMaps}>{country.maps.googleMaps}</a>
                    </div>
                </div>
            )
            }
        </div>
    )
}
