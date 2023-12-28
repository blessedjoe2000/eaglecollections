import Image from "next/image";
import aboutPhoto from "@/public/images/eaglecollectionswallpaper.jpg";

export default function About() {
  return (
    <div className="mx-5 mt-5 mb-10">
      <div>
        <Image
          src={aboutPhoto}
          alt="eagle collections about photo"
          width={1500}
          height={500}
        />
      </div>
      <h1>Our Story!</h1>
      <div className="flex gap-2">
        <div className="w-2/3">
          <h2>We are Eagle Collections!</h2>
          <p>
            We mission is to meet your African fashion needs, build your
            confidence when you dress for event, bring you the latest trend in
            the African fashion world at an affordable way.
          </p>
          <p>
            We offer custom made attires and group supplies (Asobi) for wedding,
            birthdays, church events, meetings, and personal demands. We ensure
            your vision becomes a reality.
          </p>
          <p>
            We got you covered when it comes to jewelries, Italian shoes and
            bags, purses, clutch, shoes, slippers, and a wide range of
            accessories like traditional hats, handfans, belts, designer
            glasses. We offer beads services for rental and sale for weddings
            and all kinds of occasions.
          </p>
        </div>
        <div>
          <Image
            src={aboutPhoto}
            alt="eagle collections about photo"
            width={"full"}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="">
          <Image
            src={aboutPhoto}
            alt="eagle collections about photo"
            width={"full"}
          />
        </div>
        <div className="w-1/2">
          <p>
            Discover a world of authentic African fabrics from exquiste handmade
            lace, sequins lace, chantilly lace, cord lace, dry lace and other
            variety of laces, to elegance Ankara wax prints, as well as
            beautiful varietis of silk Georges, Swiss and Italian cotton
            materials for men's agbada and kaftan.
          </p>
          <p>
            We also offer offer you the opportunity of already made embriodery,
            stylish auto-gele, asoke, sego, intorika, isi-agwu. Esan and Ghana
            traditional wrapper (igbulu), spectrum of linings and zippers
          </p>
          <p>
            We Also go the men covered as we offer already made native attires,
            slippers, different kind of traditional hats, Italian shoes, belts.
            Explore our already made stylish Ankara attires, elegant Turkish and
            Dubai dresses and more. We got you covered for your food warmers{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
