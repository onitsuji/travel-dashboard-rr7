import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";

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
  const comboBoxData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const handleSumbit = async () => {};

  const handleChange = (key: keyof TripFormData, value: string | number) => {};
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a new trip"
        description="View and edit your ai generated travel plans"
      />
      <section className="mt-2.5 wrapper-md ">
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
            />
          </div>
        </form>
      </section>
    </main>
  );
}
