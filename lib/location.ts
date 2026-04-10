import { Country, State, City } from "country-state-city";

export const getCountries = () => Country.getAllCountries();
export const getStates = (country: string) =>
  State.getStatesOfCountry(country);
export const getCities = (country: string, state: string) =>
  City.getCitiesOfState(country, state);