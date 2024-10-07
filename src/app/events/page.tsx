import { Events } from "@/app/components/data";

export default function Page() {
  return (
    <>
      <Events
        title={"Diwali & Sharda (Chopda) Pujan"}
        time={"Thursday, October 31, 2024 - 5 PM - 7 PM"}
        paragraph={`Diwali – one of the most auspicious days in the Hindu calendar will be celebrated with great devotion and splendor. On this day, business-owners close existing account books and open new ones in preparation for the year ahead. Devotees also take stock of their spiritual relationship with Bhagwan, and consider any progress or regress they have made in the year past. The ceremony, known as Chopda Pujan, will take place in the evening. Hundreds of new account books – in a variety of paper and electronic forms – are sanctified through the showering of flowers petals and rice grains amid the chanting of Vedic hymns and prayers.`}
        img={
          "https://www.baps.org/Data/Sites/1/Media/LocationImages/upcomingevents/WebImages/Chopda_Pujan_013.jpg"
        }
      />
      <Events
        title={"Family Annakut Darshan"}
        time={"Saturday, November 02, 2024 - 12PM - 7PM"}
        paragraph={`The day following Diwali is traditionally celebrated with the Annakut – literally meaning, a mountain of food. Every year thousands of vegetarian delicacies are offered in devotional gratitude for the past year and to seek blessings for the year ahead.  The Annakut offering includes snacks, sweets, pickles, spicy dishes, salads, fruit drinks and other items devotionally prepared by devotees. We cordially invite you for darshan of the Annakut with family and friends.`}
        img={
          "https://www.baps.org/Data/Sites/1/Media/LocationImages/upcomingevents/WebImages/02_PHX_BAPS_Annakut_2019.jpg"
        }
      />
    </>
  );
}
