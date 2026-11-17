import { contactEmail, contactPhone, sedi } from "@/lib/contact";
import { getPercorsi } from "@/lib/percorsi";
import { professional } from "@/lib/site";

/**
 * Domande frequenti ricavate solo da ciò che il sito già dice (Chi sono, Percorsi, Contatti).
 * Niente prezzi, durate o modalità non dichiarate dalla dottoressa.
 * Non sono pubblicate come pagina: servono solo a /llms.txt e /llms-full.txt, letti dalle IA.
 */

export type Faq = { question: string; answer: string };

const sediText = sedi.map((sede) => sede.lines.join(", ")).join("; ");
const percorsiText = getPercorsi()
  .map((p) => p.title.toLowerCase())
  .join(", ");

export const faqs: readonly Faq[] = [
  {
    question: "Chi è la Dott.ssa Francesca Nadia Lupo?",
    answer: `È psicologa e psicoterapeuta ad orientamento psicoanalitico individuale e di gruppo, specialista in sessuologia clinica e terapia di coppia. È iscritta all’${professional.register} dal ${professional.registerSince} con il n. ${professional.registerNumber} e si è specializzata con lode nel 2008 presso la COIRAG di Milano.`,
  },
  {
    question: "Dove riceve?",
    answer: `Riceve a Milano, a Opera (MI) e a Piacenza. Gli studi sono in: ${sediText}.`,
  },
  {
    question: "Di quali problematiche si occupa?",
    answer: `Dal 2008 svolge attività clinica con ${professional.audience}, occupandosi di ${professional.areasTreated.join(", ")}.`,
  },
  {
    question: "Quali percorsi propone?",
    answer: `Propone sei percorsi: ${percorsiText}. Ogni percorso ha una pagina dedicata nella sezione Percorsi.`,
  },
  {
    question: "Che approccio terapeutico utilizza?",
    answer:
      "Un approccio psicodinamico, di orientamento psicoanalitico: esplora gli aspetti del Sé non completamente conosciuti e la loro influenza sulle relazioni attuali e sui sintomi. Il terapeuta affianca il paziente lungo il percorso, senza sostituirsi a lui nella ricerca delle soluzioni.",
  },
  {
    question: "Si occupa di EMDR e traumi psicologici?",
    answer:
      "Sì. È abilitata all’esercizio dell’EMDR (Eye Movement Desensitization and Reprocessing), trattamento di comprovata efficacia per il disturbo da stress post-traumatico e per problemi legati a esperienze traumatiche o emotivamente stressanti. Si aggiorna in psicotraumatologia con l’Associazione EMDR Italia.",
  },
  {
    question: "Che cos’è la psico-oncologia?",
    answer:
      "È il supporto psicologico a chi affronta una diagnosi di cancro e ai suoi familiari: aiuta a gestire emozioni negative e stress e a trovare strategie per affrontare la malattia. La dottoressa ha maturato un’esperienza decennale in psico-oncologia presso l’Istituto Europeo di Oncologia.",
  },
  {
    question: "Che cos’è la psico-cardiologia?",
    answer:
      "È il supporto psicologico a chi ha ricevuto la diagnosi di una malattia cardiovascolare: aiuta a elaborare i vissuti di malattia, ridurre lo stress, migliorare gli stili di vita e sostiene anche i familiari. La dottoressa è stata Responsabile del Servizio di Psicologia Clinica del Centro Cardiologico Monzino.",
  },
  {
    question: "Quando può essere utile una psicoterapia di coppia?",
    answer:
      "Quando eventi significativi, come il matrimonio, la nascita di un figlio, una perdita del lavoro, una malattia o un lutto, creano conflitto o una crisi nella relazione. La terapia aiuta i partner a comprendersi, comunicare meglio, gestire i conflitti e rafforzare la connessione emotiva.",
  },
  {
    question: "Come si richiede un primo colloquio?",
    answer: `Può telefonare al ${contactPhone} oppure scrivere a ${contactEmail}.`,
  },
];
