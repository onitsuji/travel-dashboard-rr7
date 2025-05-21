import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "appwrite/appwrite";

export async function loader() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    return data.map((country: any) => ({
      name: country.flag + "" + country.name.common,
      coordinates: country.latlng,
      value: country.name.common,
      openStreetMap: country.maps?.openStreetMap,
    }));
  } catch (e) {
    console.log("Server loader for countries: ", e);
  }
}

export default function CreateTrip({ loaderData }: Route.ComponentProps) {
  const countries = loaderData as Array<Country>;

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    duration: 0,
    budget: "",
    groupType: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const comboBoxData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.budget ||
      !formData.duration ||
      !formData.groupType ||
      !formData.interest
    ) {
      setError("All fields must be filled");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError(
        "Duration must be between 1 and 10 days for accurate generation."
      );
      setLoading(false);
    }

    const user = await account.get();

    if (!user.$id) {
      console.log("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
    } catch (e) {
      console.log("Create form submit error: ", e);
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setError(null);
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a new trip"
        description="View and edit your ai generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form action="" className="trip-form" onSubmit={handleSumbit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={comboBoxData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a country"
              className="combo-box"
              change={(event: { value: string | undefined }) => {
                if (event.value) {
                  handleChange("country", event.value);
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();
                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="Enter a number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) =>
                handleChange("duration", Number(e.currentTarget.value))
              }
            />
          </div>
          {selectItems.map((item) => (
            <div key={item}>
              <label htmlFor={item}>{formatKey(item)}</label>
              <ComboBoxComponent
                id={item}
                dataSource={comboBoxItems[item].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(item)}`}
                change={(event: { value: string | undefined }) => {
                  if (event.value) {
                    handleChange(item, event.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();
                  e.updateData(
                    comboBoxItems[item]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
                className="combo-box"
              />
            </div>
          ))}
          <div>
            <label htmlFor="location">Location on the World Map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{
                    colorValuePath: "color",
                    fill: "#e5e5e5",
                  }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full" />
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                className={cn("size-5", { "animate-spin": loading })}
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
}
