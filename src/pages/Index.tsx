import { useState } from "react";
import { Hero, Services, Calculator } from "@/components/sections/HeroServicesCalc";
import { Cases, Portfolio, Reviews } from "@/components/sections/CasesPortfolioReviews";
import { Education, Blog, About } from "@/components/sections/ContentSections";
import { ModalForm, Nav, Contacts, Footer } from "@/components/sections/ContactsLayout";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCrm, setModalCrm] = useState("");

  const openModal = (crm = "") => { setModalCrm(crm); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-background">
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} defaultCrm={modalCrm} />
      <Nav onOpenModal={() => openModal()} />
      <Hero onOpenModal={() => openModal()} />
      <Services onOpenModal={openModal} />
      <Calculator />
      <Cases />
      <Portfolio />
      <Reviews />
      <Education />
      <Blog />
      <About />
      <Contacts />
      <Footer />
    </div>
  );
}
