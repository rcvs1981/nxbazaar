"use client";

import { useEffect, useState } from "react";
import { getCountries, getStates, getCities } from "@/lib/location";
import { useLocation } from "@/hooks/useLocation";
import { SearchableSelect } from "@/components/ui/searchable-select";

export default function ChooseLocation() {
  const { updateLocation } = useLocation();

  const [country, setCountry] = useState("IN");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  useEffect(() => {
    setStates(getStates(country));
  }, [country]);

  useEffect(() => {
    if (state) setCities(getCities(country, state));
  }, [state]);

  const handleSave = () => {
    updateLocation({ country, state, city });
  };

  return (
    <div>
      <h2 className="py-2 text-slate-700 dark:text-slate-300">
        Choose Location
      </h2>

      <div className="space-y-3">
        <SearchableSelect
          placeholder="Country"
          value={country}
          onChange={setCountry}
          options={countries.map((c) => ({
            label: c.name,
            value: c.isoCode,
          }))}
        />

        <SearchableSelect
          placeholder="State"
          value={state}
          onChange={setState}
          options={states.map((s) => ({
            label: s.name,
            value: s.isoCode,
          }))}
        />

        <SearchableSelect
          placeholder="City"
          value={city}
          onChange={setCity}
          options={cities.map((c) => ({
            label: c.name,
            value: c.name,
          }))}
        />

        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Save Location
        </button>
      </div>
    </div>
  );
}