import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey } from "lib/utils";

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

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {};
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
        </form>
      </section>
    </main>
  );
}
