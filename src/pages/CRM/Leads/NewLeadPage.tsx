
// // ============================================================
// // NEW LEAD PAGE
// // ============================================================
// //
// // This page is responsible for:
// // 1. Creating a new CRM Lead
// // 2. Capturing primary lead information
// // 3. Capturing classification information
// // 4. Capturing additional information
// // 5. Capturing follow-up information
// // 6. Adding new Industry / Project Type master data
// // 7. Saving the lead
// // 8. Saving the lead as draft
// // 9. Converting the lead to Contact
// // 10. Converting the lead to Opportunity
// //
// // IMPORTANT UI STRUCTURE:
// //
// // TOP RIGHT:
// //    [ Save ] [ Cancel ]
// //
// // BELOW FOLLOW-UPS:
// //    [ Convert to Contact ]
// //    [ Convert to Opportunity ]
// //    [ Discard Changes ]
// //    [ Save as Draft ]
// //    [ Submit Transaction ]
// //
// // The action buttons are intentionally compact and use the
// // same general height as the top-right Save / Cancel buttons.
// // ============================================================

// // ============================================================
// // MUI ICONS
// // ============================================================

// import AddIcon from "@mui/icons-material/AddOutlined";
// import CancelIcon from "@mui/icons-material/CloseOutlined";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
// import ExpandLessIcon from "@mui/icons-material/ExpandLessOutlined";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
// import InfoIcon from "@mui/icons-material/InfoOutlined";
// import SaveIcon from "@mui/icons-material/SaveOutlined";
// import ContactIcon from "@mui/icons-material/PersonAddAltOutlined";
// import OpportunityIcon from "@mui/icons-material/TrendingUpOutlined";
// import DraftIcon from "@mui/icons-material/DraftsOutlined";

// // ============================================================
// // MUI COMPONENTS
// // ============================================================

// import Alert from "@mui/material/Alert";
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import Collapse from "@mui/material/Collapse";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

// // ============================================================
// // REACT
// // ============================================================

// import { type ChangeEvent, type ReactNode, useState } from "react";

// // ============================================================
// // REACT ROUTER
// // ============================================================

// import { useNavigate } from "react-router-dom";

// // ============================================================
// // CUSTOM UI COMPONENTS
// // ============================================================

// import { AppButton } from "@/components/ui/AppButton";
// import { AppCard } from "@/components/ui/AppCard";
// import { AppInput } from "@/components/ui/AppInput";
// import { AppModal } from "@/components/ui/AppModal";

// // ============================================================
// // 1. FORM DATA TYPE
// // ============================================================

// type LeadFormValues = {
//   companyName: string;
//   contactPerson: string;
//   phone: string;
//   email: string;

//   industry: string;
//   projectType: string;
//   leadSource: string;
//   status: string;
//   assignedTo: string;

//   website: string;
//   companySize: string;
//   annualRevenue: string;

//   address: string;
//   subsidiary: string;

//   projectDescription: string;
//   notes: string;
// };

// // ============================================================
// // 2. FOLLOW-UP DATA TYPE
// // ============================================================

// type FollowUpValues = {
//   followUpDate: string;
//   nextFollowUpDate: string;
//   status: string;
//   activityType: string;
//   remarks: string;
//   attachments: File[];
// };

// // ============================================================
// // 3. FIELD NAME TYPE
// // ============================================================

// type LeadFieldName = keyof LeadFormValues;

// // ============================================================
// // 4. FEEDBACK TYPE
// // ============================================================

// type FeedbackState = {
//   severity: "success" | "info";
//   text: string;
// } | null;

// // ============================================================
// // 5. SELECT OPTION TYPE
// // ============================================================

// type SelectOption = {
//   value: string;
//   label: string;
// };

// // ============================================================
// // 6. TODAY DATE HELPER
// // ============================================================

// const todayIsoDate = (): string => {
//   return new Date().toISOString().split("T")[0] ?? "";
// };

// // ============================================================
// // 7. MASTER DATA FIELD TYPE
// // ============================================================

// type MasterDataFieldProps = {
//   label: string;
//   value: string;
//   options: string[];
//   placeholder: string;
//   error: string | undefined;
//   onChange: (value: string) => void;
//   /** Show the add (+) button for this field. */
//   allowAdd?: boolean;
//   onOpenAdd: () => void;
// };

// // ============================================================
// // 8. SECTION CARD TYPE
// // ============================================================

// type SectionCardProps = {
//   title: string;
//   description?: string;
//   open: boolean;
//   onToggle: () => void;
//   children: ReactNode;
// };

// // ============================================================
// // 9. REQUIRED FIELD LABELS
// // ============================================================

// const requiredLabels: Record<LeadFieldName, string> = {
//   companyName: "Company Name",
//   contactPerson: "Contact Person",
//   phone: "Phone Number",
//   email: "Email",

//   industry: "Industry",
//   projectType: "Project Type",
//   leadSource: "Lead Source",
//   status: "Status",
//   assignedTo: "Assigned To",

//   website: "Website",
//   companySize: "Company Size",
//   annualRevenue: "Annual Revenue",

//   address: "Address",
//   subsidiary: "Subsidiary",

//   projectDescription: "Project Description",
//   notes: "Notes",
// };

// // ============================================================
// // 10. INITIAL LEAD FORM VALUES
// // ============================================================

// const initialForm: LeadFormValues = {
//   companyName: "",
//   contactPerson: "",
//   phone: "",
//   email: "",

//   industry: "",
//   projectType: "",
//   leadSource: "",
//   status: "New",
//   assignedTo: "",

//   website: "",
//   companySize: "",
//   annualRevenue: "",

//   address: "",
//   subsidiary: "",

//   projectDescription: "",
//   notes: "",
// };

// // ============================================================
// // 11. INITIAL FOLLOW-UP VALUES
// // ============================================================

// const initialFollowUp: FollowUpValues = {
//   followUpDate: todayIsoDate(),
//   nextFollowUpDate: "",
//   status: "",
//   activityType: "",
//   remarks: "",
//   attachments: [],
// };

// // ============================================================
// // 12. INDUSTRY MASTER DATA
// // ============================================================

// const initialIndustries = [
//   "Marine",
//   "Construction",
//   "Manufacturing",
//   "Logistics",
//   "Technology",
//   "Oil & Gas",
//   "Healthcare",
//   "Finance",
// ];

// // ============================================================
// // 13. PROJECT TYPE MASTER DATA
// // ============================================================

// const initialProjectTypes = ["New Business", "Maintenance", "Upgrade"];

// // ============================================================
// // 14. LEAD SOURCE OPTIONS
// // ============================================================

// const leadSourceOptions = ["Exhibition", "Referral", "Website", "Social Media"];

// // ============================================================
// // 15. STATUS OPTIONS
// // ============================================================

// const statusOptions = ["New", "Contacted", "Qualified", "Disqualified", "Converted"];

// // ============================================================
// // 16. ASSIGNED TO OPTIONS
// // ============================================================

// const assignedToOptions = ["Priya Sharma", "Liam Walker", "Arjun Rao", "Rahul Menon"];

// // ============================================================
// // 17. COMPANY SIZE OPTIONS
// // ============================================================

// const companySizeOptions = [
//   "0–50 employees",
//   "50–100 employees",
//   "100–150 employees",
//   "150–250 employees",
//   "250–500 employees",
//   "500+ employees",
// ];

// // ============================================================
// // 18. ANNUAL REVENUE OPTIONS
// // ============================================================

// const annualRevenueOptions = ["Less than 1M", "1M–5M", "5M–10M", "10M–50M", "50M–100M", "100M+"];

// // ============================================================
// // 19. FOLLOW-UP STATUS OPTIONS
// // ============================================================

// const followUpStatusOptions = ["Pending", "Completed", "Rescheduled", "Cancelled"];

// // ============================================================
// // 20. ACTIVITY TYPE OPTIONS
// // ============================================================

// const activityTypeOptions = ["Call", "Email", "Meeting", "Site Visit", "WhatsApp"];

// // ============================================================
// // 21. SUBSIDIARY OPTIONS
// // ============================================================

// const subsidiaryOptions: SelectOption[] = [
//   {
//     value: "TOM Marine Pte Ltd",
//     label: "TOM Marine Pte Ltd",
//   },
//   {
//     value: "TOM Offshore Marine Engineering",
//     label: "TOM Offshore Marine Engineering",
//   },
//   {
//     value: "TOM Shipyard",
//     label: "TOM Shipyard",
//   },
//   {
//     value: "TOM Engineering Services",
//     label: "TOM Engineering Services",
//   },
// ];

// // ============================================================
// // 22. SECTION CARD COMPONENT
// // ============================================================

// function SectionCard({ title, description, open, onToggle, children }: SectionCardProps) {
//   return (
//     <AppCard
//       disablePadding
//       sx={{
//         overflow: "hidden",
//       }}
//     >
//       {/* ======================================================
//           SECTION HEADER
//           ====================================================== */}

//       <ButtonBase
//         onClick={onToggle}
//         sx={{
//           width: "100%",
//           textAlign: "left",

//           px: {
//             xs: 2,
//             md: 2.5,
//           },

//           py: {
//             xs: 1.5,
//             md: 1.75,
//           },

//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",

//           gap: 2,
//         }}
//       >
//         {/* ====================================================
//             TITLE + DESCRIPTION
//             ==================================================== */}

//         <Box
//           sx={{
//             minWidth: 0,
//           }}
//         >
//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 700,
//             }}
//           >
//             {title}
//           </Typography>

//           {description && (
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 mt: 0.25,
//               }}
//             >
//               {description}
//             </Typography>
//           )}
//         </Box>

//         {/* ====================================================
//             OPEN / CLOSE ICON
//             ==================================================== */}

//         {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ButtonBase>

//       {/* ======================================================
//           SECTION CONTENT
//           ====================================================== */}

//       <Collapse in={open}>
//         <Box
//           sx={{
//             p: {
//               xs: 2,
//               md: 2.5,
//             },
//           }}
//         >
//           {children}
//         </Box>
//       </Collapse>
//     </AppCard>
//   );
// }

// // ============================================================
// // 23. MASTER DATA FIELD COMPONENT
// // ============================================================

// function MasterDataField({
//   label,
//   value,
//   options,
//   placeholder,
//   error,
//   onChange,
//   allowAdd = false,
//   onOpenAdd,
// }: MasterDataFieldProps) {
//   const selectOptions: SelectOption[] = [
//     {
//       value: "",
//       label: placeholder,
//     },

//     ...options.map((option) => ({
//       value: option,
//       label: option,
//     })),
//   ];

//   return (
//     <Box
//       sx={{
//         display: "grid",

//         gridTemplateColumns: "minmax(0, 1fr)",

//         columnGap: 0,

//         alignItems: "start",

//         minWidth: 0,

//         ...(allowAdd
//           ? {
//               // On desktop/laptop, reveal the add button only on hover/focus.
//               "@media (hover: hover)": {
//                 gridTemplateColumns: "minmax(0, 1fr) 0px",
//                 columnGap: 0,
//                 transition:
//                   "grid-template-columns 220ms cubic-bezier(0.22, 1, 0.36, 1), column-gap 220ms cubic-bezier(0.22, 1, 0.36, 1)",

//                 "&:hover, &:focus-within": {
//                   gridTemplateColumns: "minmax(0, 1fr) 42px",
//                   columnGap: 1,
//                 },

//                 "& .master-add-slot": {
//                   width: 0,
//                   opacity: 0,
//                   overflow: "hidden",
//                   transition:
//                     "width 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease",
//                 },

//                 "&:hover .master-add-slot, &:focus-within .master-add-slot": {
//                   width: 42,
//                   opacity: 1,
//                 },

//                 "& .master-add-btn": {
//                   width: 42,
//                   minWidth: 42,
//                   opacity: 0,
//                   transform: "translateX(6px) scale(0.96)",
//                   pointerEvents: "none",
//                 },

//                 "&:hover .master-add-btn, &:focus-within .master-add-btn": {
//                   opacity: 1,
//                   transform: "translateX(0) scale(1)",
//                   pointerEvents: "auto",
//                 },
//               },

//               // On touch devices (no hover), keep it visible for accessibility.
//               "@media (hover: none)": {
//                 gridTemplateColumns: "minmax(0, 1fr) 42px",
//                 columnGap: 1,

//                 "& .master-add-slot": {
//                   width: 42,
//                   opacity: 1,
//                   overflow: "hidden",
//                 },

//                 "& .master-add-btn": {
//                   width: 42,
//                   minWidth: 42,
//                   opacity: 1,
//                   transform: "none",
//                   pointerEvents: "auto",
//                 },
//               },
//             }
//           : {}),
//       }}
//     >
//       {/* ====================================================
//           DROPDOWN INPUT
//           ==================================================== */}

//       <AppInput
//         label={label}
//         value={value}
//         onChange={(event) => {
//           onChange(event.target.value);
//         }}
//         options={selectOptions}
//         error={Boolean(error)}
//         helperText={error ?? " "}
//       />

//       {/* ====================================================
//           ADD BUTTON
//           ==================================================== */}

//       {allowAdd && (
//         <Box className="master-add-slot" sx={{ minWidth: 0 }}>
//           <AppButton
//             className="master-add-btn"
//             size="small"
//             emphasis="secondary"
//             tone="neutral"
//             onClick={onOpenAdd}
//             aria-label={`Add new ${label}`}
//             sx={{
//               minWidth: 42,
//               width: 42,
//               height: 40,

//               p: 0,
//               mt: 0,

//               flexShrink: 0,

//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",

//               transition: "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
//             }}
//           >
//             <AddIcon fontSize="small" />
//           </AppButton>
//         </Box>
//       )}
//     </Box>
//   );
// }

// // ============================================================
// // 24. NEW LEAD PAGE
// // ============================================================

// const NewLeadPage = () => {
//   // ==========================================================
//   // ROUTER NAVIGATION
//   // ==========================================================

//   const navigate = useNavigate();

//   // ==========================================================
//   // MAIN LEAD FORM STATE
//   // ==========================================================

//   const [form, setForm] = useState<LeadFormValues>(initialForm);

//   // ==========================================================
//   // FOLLOW-UP STATE
//   // ==========================================================

//   const [followUp, setFollowUp] = useState<FollowUpValues>(initialFollowUp);

//   // ==========================================================
//   // VALIDATION ERRORS
//   // ==========================================================

//   const [errors, setErrors] = useState<Partial<Record<LeadFieldName, string>>>({});

//   // ==========================================================
//   // SECTION OPEN / CLOSE STATES
//   // ==========================================================

//   // Primary Information starts OPEN.
//   const [primaryOpen, setPrimaryOpen] = useState(true);

//   // Classification starts CLOSED.
//   const [classificationOpen, setClassificationOpen] = useState(false);

//   // Additional Information starts CLOSED.
//   const [additionalOpen, setAdditionalOpen] = useState(false);

//   // Follow-Ups starts CLOSED.
//   const [followUpOpen, setFollowUpOpen] = useState(false);

//   // ==========================================================
//   // MASTER DATA
//   // ==========================================================

//   const [industries, setIndustries] = useState(initialIndustries);

//   const [projectTypes, setProjectTypes] = useState(initialProjectTypes);

//   // ==========================================================
//   // MASTER DATA POPUP STATE
//   // ==========================================================

//   const [activeMasterField, setActiveMasterField] = useState<"industry" | "projectType" | null>(
//     null,
//   );

//   // ==========================================================
//   // NEW MASTER VALUE
//   // ==========================================================

//   const [newMasterValue, setNewMasterValue] = useState("");

//   // ==========================================================
//   // FEEDBACK MESSAGE
//   // ==========================================================

//   const [feedback, setFeedback] = useState<FeedbackState>(null);

//   // ==========================================================
//   // SUBSIDIARY
//   // ==========================================================

//   const [subsidiaries] = useState(subsidiaryOptions);

//   // ==========================================================
//   // COMPACT BUTTON STYLE
//   // ==========================================================
//   //
//   // All bottom action buttons use the same compact size
//   // as the Save / Cancel buttons in the top-right.
//   //
//   // IMPORTANT:
//   // Do not make these buttons 48px / 50px height.
//   // Keep them around 40px.
//   // ==========================================================

//   const followUpActionSx = {
//     minHeight: 40,
//     height: 40,

//     px: 1.75,

//     borderRadius: 1.5,

//     fontSize: "0.70rem",

//     fontWeight: 700,

//     lineHeight: 1.2,

//     letterSpacing: "0.04em",

//     textTransform: "uppercase",

//     whiteSpace: "nowrap",

//     flexShrink: 0,

//     "& .MuiButton-startIcon": {
//       marginRight: 0.65,
//     },

//     "& svg": {
//       fontSize: 16,
//     },

//     // --------------------------------------------------------
//     // Mobile
//     // --------------------------------------------------------

//     "@media (max-width:600px)": {
//       px: 1.25,
//       fontSize: "0.65rem",
//     },
//   };

//   // ==========================================================
//   // UPDATE LEAD FORM FIELD
//   // ==========================================================

//   const updateField = (field: LeadFieldName, value: string) => {
//     setForm((current) => ({
//       ...current,
//       [field]: value,
//     }));

//     // Remove validation error after user edits field.
//     setErrors((current) => {
//       if (!current[field]) {
//         return current;
//       }

//       const next = {
//         ...current,
//       };

//       delete next[field];

//       return next;
//     });
//   };

//   // ==========================================================
//   // UPDATE FOLLOW-UP FIELD
//   // ==========================================================
//   //
//   // IMPORTANT:
//   // Generic function prevents TypeScript errors when
//   // updating "attachments" with File[] and other fields
//   // with string values.
//   // ==========================================================

//   const updateFollowUp = <K extends keyof FollowUpValues>(field: K, value: FollowUpValues[K]) => {
//     setFollowUp((current) => ({
//       ...current,
//       [field]: value,
//     }));
//   };

//   // ==========================================================
//   // FOLLOW-UP FILE UPLOAD
//   // ==========================================================

//   const handleFollowUpFiles = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files ?? []);

//     updateFollowUp("attachments", files);
//   };

//   // ==========================================================
//   // FORM VALIDATION
//   // ==========================================================

//   const validate = () => {
//     const nextErrors: Partial<Record<LeadFieldName, string>> = {};

//     const trimmedPhone = form.phone.trim();

//     const trimmedEmail = form.email.trim();

//     // --------------------------------------------------------
//     // REQUIRED FIELDS
//     // --------------------------------------------------------

//     if (!form.companyName.trim()) {
//       nextErrors.companyName = `${requiredLabels.companyName} is required`;
//     }

//     if (!form.contactPerson.trim()) {
//       nextErrors.contactPerson = `${requiredLabels.contactPerson} is required`;
//     }

//     if (!form.phone.trim()) {
//       nextErrors.phone = `${requiredLabels.phone} is required`;
//     }

//     if (!form.email.trim()) {
//       nextErrors.email = `${requiredLabels.email} is required`;
//     }

//     if (!form.address.trim()) {
//       nextErrors.address = `${requiredLabels.address} is required`;
//     }

//     // --------------------------------------------------------
//     // EMAIL VALIDATION
//     // --------------------------------------------------------

//     if (trimmedEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
//       nextErrors.email = "Enter a valid email address";
//     }

//     // --------------------------------------------------------
//     // PHONE VALIDATION
//     // --------------------------------------------------------

//     if (trimmedPhone) {
//       const phonePattern = /^[+()\-\s.\d]+$/;

//       const digitCount = trimmedPhone.replace(/\D/g, "").length;

//       if (!phonePattern.test(trimmedPhone) || digitCount < 6) {
//         nextErrors.phone = "Enter a valid phone number";
//       }
//     }

//     return nextErrors;
//   };

//   // ==========================================================
//   // SAVE LEAD
//   // ==========================================================

//   const handleSave = () => {
//     const nextErrors = validate();

//     // Stop if validation fails.
//     if (Object.keys(nextErrors).length > 0) {
//       setErrors(nextErrors);
//       setFeedback(null);

//       return;
//     }

//     // Clear errors.
//     setErrors({});

//     // Backend-ready payload.
//     const payload = {
//       ...form,

//       followUp: {
//         followUpDate: followUp.followUpDate,

//         nextFollowUpDate: followUp.nextFollowUpDate,

//         status: followUp.status,

//         activityType: followUp.activityType,

//         remarks: followUp.remarks,

//         attachments: followUp.attachments,
//       },
//     };

//     // Temporary console log.
//     console.log("New Lead Payload:", payload);

//     // Success message.
//     setFeedback({
//       severity: "success",
//       text: "Lead saved successfully.",
//     });
//   };

//   // ==========================================================
//   // SAVE AS DRAFT
//   // ==========================================================

//   const handleDraft = () => {
//     setErrors({});

//     const draftPayload = {
//       ...form,
//       followUp,
//     };

//     console.log("Lead Draft:", draftPayload);

//     setFeedback({
//       severity: "info",
//       text: "Lead draft saved locally.",
//     });
//   };

//   // ==========================================================
//   // CONVERT LEAD TO CONTACT
//   // ==========================================================

//   const handleConvertToContact = () => {
//     setErrors({});

//     console.log("Convert Lead to Contact:", {
//       ...form,
//       followUp,
//     });

//     setFeedback({
//       severity: "info",
//       text: "Lead conversion to contact is prepared locally.",
//     });
//   };

//   // ==========================================================
//   // CONVERT LEAD TO OPPORTUNITY
//   // ==========================================================

//   const handleConvertToOpportunity = () => {
//     setErrors({});

//     console.log("Convert Lead to Opportunity:", {
//       ...form,
//       followUp,
//     });

//     setFeedback({
//       severity: "info",
//       text: "Lead conversion to opportunity is prepared locally.",
//     });
//   };

//   // ==========================================================
//   // DISCARD CHANGES
//   // ==========================================================

//   const handleDiscardChanges = () => {
//     setForm(initialForm);

//     setFollowUp({
//       ...initialFollowUp,
//       followUpDate: todayIsoDate(),
//     });

//     setErrors({});

//     setFeedback({
//       severity: "info",
//       text: "Changes discarded.",
//     });
//   };

//   // ==========================================================
//   // SUBMIT TRANSACTION
//   // ==========================================================

//   const handleSubmitTransaction = () => {
//     const nextErrors = validate();

//     if (Object.keys(nextErrors).length > 0) {
//       setErrors(nextErrors);
//       setFeedback(null);

//       return;
//     }

//     const payload = {
//       ...form,
//       followUp,
//     };

//     console.log("Submit Transaction:", payload);

//     setErrors({});

//     setFeedback({
//       severity: "success",
//       text: "Transaction submitted successfully.",
//     });
//   };

//   // ==========================================================
//   // OPEN MASTER DATA POPUP
//   // ==========================================================

//   const openMasterDataPopup = (field: "industry" | "projectType") => {
//     setActiveMasterField(field);
//     setNewMasterValue("");
//   };

//   // ==========================================================
//   // CLOSE MASTER DATA POPUP
//   // ==========================================================

//   const closeMasterDataPopup = () => {
//     setActiveMasterField(null);
//     setNewMasterValue("");
//   };

//   // ==========================================================
//   // SAVE NEW MASTER DATA
//   // ==========================================================

//   const saveMasterValue = () => {
//     const value = newMasterValue.trim();

//     if (!value || !activeMasterField) {
//       return;
//     }

//     // --------------------------------------------------------
//     // SAVE NEW INDUSTRY
//     // --------------------------------------------------------

//     if (activeMasterField === "industry") {
//       setIndustries((current) => {
//         const alreadyExists = current.some((item) => item.toLowerCase() === value.toLowerCase());

//         if (alreadyExists) {
//           return current;
//         }

//         return [...current, value];
//       });

//       // Automatically select newly added industry.
//       updateField("industry", value);
//     }

//     // --------------------------------------------------------
//     // SAVE NEW PROJECT TYPE
//     // --------------------------------------------------------

//     if (activeMasterField === "projectType") {
//       setProjectTypes((current) => {
//         const alreadyExists = current.some((item) => item.toLowerCase() === value.toLowerCase());

//         if (alreadyExists) {
//           return current;
//         }

//         return [...current, value];
//       });

//       // Automatically select newly added project type.
//       updateField("projectType", value);
//     }

//     // Close modal.
//     closeMasterDataPopup();
//   };

//   // ==========================================================
//   // POPUP TITLE
//   // ==========================================================

//   const masterModalTitle =
//     activeMasterField === "industry" ? "Add New Industry" : "Add New Project Type";

//   // ==========================================================
//   // POPUP INPUT LABEL
//   // ==========================================================

//   const masterModalInputLabel = activeMasterField === "industry" ? "Industry" : "Project Type";

//   // ==========================================================
//   // RETURN UI
//   // ==========================================================

//   return (
//     <Stack
//       spacing={{
//         xs: 2,
//         md: 2.5,
//       }}
//       sx={{
//         width: "100%",
//         minWidth: 0,
//       }}
//     >
//       {/* ======================================================
//           PAGE HEADER
//           ====================================================== */}

//       <Box
//         sx={{
//           display: "grid",

//           gridTemplateColumns: {
//             xs: "minmax(0, 1fr)",
//             lg: "minmax(0, 1fr) auto",
//           },

//           gap: 2,

//           alignItems: {
//             xs: "flex-start",
//             lg: "center",
//           },

//           width: "100%",
//         }}
//       >
//         {/* ====================================================
//             PAGE TITLE
//             ==================================================== */}

//         <Box
//           sx={{
//             minWidth: 0,
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontSize: {
//                 xs: "1.5rem",
//                 md: "1.75rem",
//               },

//               fontWeight: 700,
//             }}
//           >
//             New Lead Entry
//           </Typography>

//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               mt: 0.5,
//             }}
//           >
//             Create and capture a new CRM lead
//           </Typography>
//         </Box>

//         {/* ====================================================
//             TOP RIGHT ACTION BUTTONS
//             ==================================================== */}

//         <Stack
//           direction="row"
//           spacing={1}
//           useFlexGap
//           sx={{
//             width: {
//               xs: "100%",
//               sm: "auto",
//             },

//             justifyContent: {
//               xs: "flex-start",
//               lg: "flex-end",
//             },

//             alignItems: "center",

//             flexWrap: "wrap",
//           }}
//         >
//           {/* SAVE */}

//           <AppButton
//             size="small"
//             startIcon={<SaveIcon />}
//             onClick={handleSave}
//             sx={{
//               minHeight: 40,
//               height: 40,

//               justifyContent: "center",

//               fontSize: "0.72rem",
//               fontWeight: 700,
//             }}
//           >
//             Save
//           </AppButton>

//           {/* CANCEL */}

//           <AppButton
//             size="small"
//             emphasis="secondary"
//             tone="neutral"
//             startIcon={<CancelIcon />}
//             onClick={() => navigate("/crm/leads")}
//             sx={{
//               minHeight: 40,
//               height: 40,

//               justifyContent: "center",

//               fontSize: "0.72rem",
//               fontWeight: 700,
//             }}
//           >
//             Cancel
//           </AppButton>
//         </Stack>
//       </Box>

//       {/* ======================================================
//           FEEDBACK MESSAGE
//           ====================================================== */}

//       {feedback && (
//         <Alert
//           severity={feedback.severity}
//           icon={feedback.severity === "info" ? <InfoIcon fontSize="inherit" /> : undefined}
//           onClose={() => setFeedback(null)}
//         >
//           {feedback.text}
//         </Alert>
//       )}

//       {/* ======================================================
//           PRIMARY INFORMATION
//           ====================================================== */}

//       <SectionCard
//         title="Primary Information"
//         description="Capture the essential lead details"
//         open={primaryOpen}
//         onToggle={() => setPrimaryOpen((current) => !current)}
//       >
//         <Box
//           sx={{
//             display: "grid",

//             gridTemplateColumns: {
//               xs: "minmax(0, 1fr)",
//               md: "repeat(3, minmax(0, 1fr))",
//             },

//             gap: 2,

//             minWidth: 0,
//           }}
//         >
//           {/* COMPANY NAME */}

//           <AppInput
//             label="Company Name"
//             value={form.companyName}
//             onChange={(event) => updateField("companyName", event.target.value)}
//             required
//             error={Boolean(errors.companyName)}
//             helperText={errors.companyName ?? " "}
//           />

//           {/* CONTACT PERSON */}

//           <AppInput
//             label="Contact Person"
//             value={form.contactPerson}
//             onChange={(event) => updateField("contactPerson", event.target.value)}
//             required
//             error={Boolean(errors.contactPerson)}
//             helperText={errors.contactPerson ?? " "}
//           />

//           {/* PHONE */}

//           <AppInput
//             label="Phone Number"
//             value={form.phone}
//             onChange={(event) => updateField("phone", event.target.value)}
//             required
//             error={Boolean(errors.phone)}
//             helperText={errors.phone ?? " "}
//           />

//           {/* EMAIL */}

//           <AppInput
//             label="Email"
//             type="email"
//             value={form.email}
//             onChange={(event) => updateField("email", event.target.value)}
//             required
//             error={Boolean(errors.email)}
//             helperText={errors.email ?? " "}
//           />

//           {/* INDUSTRY */}

//           <MasterDataField
//             label="Industry"
//             value={form.industry}
//             options={industries}
//             placeholder="Select industry"
//             error={errors.industry}
//             allowAdd
//             onChange={(value) => updateField("industry", value)}
//             onOpenAdd={() => openMasterDataPopup("industry")}
//           />

//           {/* PROJECT TYPE */}

//           <MasterDataField
//             label="Project Type"
//             value={form.projectType}
//             options={projectTypes}
//             placeholder="Select project type"
//             error={errors.projectType}
//             allowAdd={false}
//             onChange={(value) => updateField("projectType", value)}
//             onOpenAdd={() => openMasterDataPopup("projectType")}
//           />

//           {/* LEAD SOURCE */}

//           <AppInput
//             label="Lead Source"
//             value={form.leadSource}
//             onChange={(event) => updateField("leadSource", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select lead source",
//               },

//               ...leadSourceOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText={errors.leadSource ?? " "}
//           />

//           {/* STATUS */}

//           <AppInput
//             label="Status"
//             value={form.status}
//             onChange={(event) => updateField("status", event.target.value)}
//             options={statusOptions.map((option) => ({
//               value: option,
//               label: option,
//             }))}
//             helperText=" "
//           />

//           {/* ASSIGNED TO */}

//           <AppInput
//             label="Assigned To"
//             value={form.assignedTo}
//             onChange={(event) => updateField("assignedTo", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select sales person",
//               },

//               ...assignedToOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText=" "
//           />

//           {/* WEBSITE */}

//           <AppInput
//             label="Website"
//             value={form.website}
//             onChange={(event) => updateField("website", event.target.value)}
//             helperText=" "
//           />

//           {/* COMPANY SIZE */}

//           <AppInput
//             label="Company Size"
//             value={form.companySize}
//             onChange={(event) => updateField("companySize", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select company size",
//               },

//               ...companySizeOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText=" "
//           />

//           {/* ANNUAL REVENUE */}

//           <AppInput
//             label="Annual Revenue"
//             value={form.annualRevenue}
//             onChange={(event) => updateField("annualRevenue", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select annual revenue",
//               },

//               ...annualRevenueOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText=" "
//           />

//           {/* ADDRESS */}

//           <Box
//             sx={{
//               gridColumn: {
//                 xs: "span 1",
//                 md: "span 3",
//               },

//               minWidth: 0,
//             }}
//           >
//             <AppInput
//               label="Address"
//               value={form.address}
//               onChange={(event) => updateField("address", event.target.value)}
//               required
//               multiline
//               minRows={3}
//               error={Boolean(errors.address)}
//               helperText={errors.address ?? " "}
//             />
//           </Box>
//         </Box>
//       </SectionCard>

//       {/* ======================================================
//           CLASSIFICATION
//           ====================================================== */}

//       <SectionCard
//         title="Classification"
//         description="Map the lead to the correct subsidiary"
//         open={classificationOpen}
//         onToggle={() => setClassificationOpen((current) => !current)}
//       >
//         <Box
//           sx={{
//             display: "grid",

//             gridTemplateColumns: {
//               xs: "minmax(0, 1fr)",
//               md: "repeat(3, minmax(0, 1fr))",
//             },

//             gap: 2,

//             minWidth: 0,
//           }}
//         >
//           {/* SUBSIDIARY */}

//           <Box
//             sx={{
//               gridColumn: {
//                 xs: "span 1",
//                 md: "span 3",
//               },

//               minWidth: 0,
//             }}
//           >
//             <AppInput
//               label="Subsidiary"
//               value={form.subsidiary}
//               onChange={(event) => updateField("subsidiary", event.target.value)}
//               options={[
//                 {
//                   value: "",
//                   label: "Select subsidiary",
//                 },

//                 ...subsidiaries,
//               ]}
//               helperText={errors.subsidiary ?? " "}
//             />
//           </Box>
//         </Box>
//       </SectionCard>

//       {/* ======================================================
//           ADDITIONAL INFORMATION
//           ====================================================== */}

//       <SectionCard
//         title="Additional Information"
//         description="Capture context, scope and notes"
//         open={additionalOpen}
//         onToggle={() => setAdditionalOpen((current) => !current)}
//       >
//         <Box
//           sx={{
//             display: "grid",

//             gridTemplateColumns: {
//               xs: "minmax(0, 1fr)",
//               md: "repeat(2, minmax(0, 1fr))",
//             },

//             gap: 2,

//             minWidth: 0,
//           }}
//         >
//           {/* PROJECT DESCRIPTION */}

//           <AppInput
//             label="Project Description"
//             value={form.projectDescription}
//             onChange={(event) => updateField("projectDescription", event.target.value)}
//             multiline
//             minRows={4}
//             helperText={errors.projectDescription ?? " "}
//           />

//           {/* NOTES */}

//           <AppInput
//             label="Notes"
//             value={form.notes}
//             onChange={(event) => updateField("notes", event.target.value)}
//             multiline
//             minRows={4}
//             helperText={errors.notes ?? " "}
//           />
//         </Box>
//       </SectionCard>

//       {/* ======================================================
//           FOLLOW-UPS
//           ====================================================== */}

//       <SectionCard
//         title="Follow-Ups"
//         description="Track follow-up activities and next actions"
//         open={followUpOpen}
//         onToggle={() => setFollowUpOpen((current) => !current)}
//       >
//         <Box
//           sx={{
//             display: "grid",

//             gridTemplateColumns: {
//               xs: "minmax(0, 1fr)",
//               md: "repeat(2, minmax(0, 1fr))",
//             },

//             gap: 2,

//             minWidth: 0,
//           }}
//         >
//           {/* FOLLOW UP DATE */}

//           <AppInput
//             label="Follow Up Date"
//             type="date"
//             value={followUp.followUpDate}
//             onChange={(event) => updateFollowUp("followUpDate", event.target.value)}
//             helperText=" "
//           />

//           {/* NEXT FOLLOW UP DATE */}

//           <AppInput
//             label="Next Follow Up Date"
//             type="date"
//             value={followUp.nextFollowUpDate}
//             onChange={(event) => updateFollowUp("nextFollowUpDate", event.target.value)}

//             helperText=" "
//             sx={{
//               "& .MuiInputLabel-root": {
//                 transform: "translate(14px, -9px) scale(0.75)",
//                 transformOrigin: "top left",
//               },

//               "& .MuiInputLabel-root.Mui-focused": {
//                 transform: "translate(14px, -9px) scale(0.75)",
//               },
//             }}
//           />

//           {/* FOLLOW UP STATUS */}

//           <AppInput
//             label="Status"
//             value={followUp.status}
//             onChange={(event) => updateFollowUp("status", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select Status",
//               },

//               ...followUpStatusOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText=" "
//           />

//           {/* ACTIVITY TYPE */}

//           <AppInput
//             label="Activity Type"
//             value={followUp.activityType}
//             onChange={(event) => updateFollowUp("activityType", event.target.value)}
//             options={[
//               {
//                 value: "",
//                 label: "Select Activity Type",
//               },

//               ...activityTypeOptions.map((option) => ({
//                 value: option,
//                 label: option,
//               })),
//             ]}
//             helperText=" "
//           />

//           {/* REMARKS */}

//           <Box
//             sx={{
//               gridColumn: {
//                 xs: "span 1",
//                 md: "span 2",
//               },

//               minWidth: 0,
//             }}
//           >
//             <AppInput
//               label="Remarks"
//               value={followUp.remarks}
//               onChange={(event) => updateFollowUp("remarks", event.target.value)}
//               multiline
//               minRows={4}
//               placeholder="Follow-up notes"
//               helperText=" "
//             />
//           </Box>

//           {/* ATTACHMENTS */}

//           <Box
//             sx={{
//               gridColumn: {
//                 xs: "span 1",
//                 md: "span 2",
//               },

//               minWidth: 0,
//             }}
//           >
//             {/* ATTACHMENTS LABEL */}

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 mb: 0.75,
//                 fontWeight: 500,
//               }}
//             >
//               Attachments
//             </Typography>

//             {/* FILE SELECT AREA */}

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 flexWrap: "wrap",
//               }}
//             >
//               {/* CHOOSE FILES BUTTON */}

//               <ButtonBase
//                 component="label"
//                 sx={{
//                   px: 2.5,
//                   py: 1.25,

//                   borderRadius: 1.5,

//                   bgcolor: "action.hover",

//                   fontWeight: 600,

//                   "&:hover": {
//                     bgcolor: "action.selected",
//                   },
//                 }}
//               >
//                 Choose files
//                 <input type="file" hidden multiple onChange={handleFollowUpFiles} />
//               </ButtonBase>

//               {/* SELECTED FILE COUNT */}

//               <Typography variant="body2" color="text.secondary">
//                 {followUp.attachments.length === 0
//                   ? "No file chosen"
//                   : `${followUp.attachments.length} file${
//                       followUp.attachments.length > 1 ? "s" : ""
//                     } selected`}
//               </Typography>
//             </Box>

//             {/* SELECTED FILE NAMES */}

//             {followUp.attachments.length > 0 && (
//               <Stack
//                 spacing={0.5}
//                 sx={{
//                   mt: 1.5,
//                 }}
//               >
//                 {followUp.attachments.map((file, index) => (
//                   <Typography
//                     key={`${file.name}-${index}`}
//                     variant="caption"
//                     color="text.secondary"
//                   >
//                     {file.name}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Box>
//       </SectionCard>

//       {/* ======================================================
//           FOLLOW-UP ACTION BAR
//           ====================================================== */}
//       {/*
//         IMPORTANT CHANGE:

//         Previously:

//         justifyContent: "flex-end"

//         was pushing all buttons to the right.

//         Now:

//         justifyContent: "flex-start"

//         makes the first button start from the same left
//         alignment as the content cards.

//         This fixes the unwanted left/right spacing.
//       */}

//       <Box
//         sx={{
//           width: "100%",

//           display: "flex",

//           // ==================================================
//           // DESKTOP:
//           // Keep buttons aligned to the LEFT.
//           // ==================================================

//           justifyContent: "flex-start",

//           mt: 0.5,

//           px: 0,

//           minWidth: 0,
//         }}
//       >
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//           spacing={1}
//           useFlexGap
//           sx={{
//             width: {
//               xs: "100%",
//               sm: "auto",
//             },

//             alignItems: {
//               xs: "stretch",
//               sm: "center",
//             },

//             // ==================================================
//             // IMPORTANT:
//             // Do NOT use flex-end here.
//             // ==================================================

//             justifyContent: "flex-start",

//             flexWrap: "wrap",

//             minWidth: 0,
//           }}
//         >
//           {/* ==================================================
//               CONVERT TO OPPORTUNITY
//               ================================================== */}

//           <AppButton
//             size="small"
//             emphasis="secondary"
//             tone="neutral"
//             startIcon={<OpportunityIcon />}
//             onClick={handleConvertToOpportunity}
//             sx={{
//               ...followUpActionSx,

//               color: "#0AAE83",

//               border: "1px solid #B8EBDD",

//               backgroundColor: "#F3FCF8",

//               "&:hover": {
//                 backgroundColor: "#E8F9F3",

//                 borderColor: "#8EDDC5",
//               },

//               "@media (max-width:600px)": {
//                 width: "100%",
//               },
//             }}
//           >
//             Convert to Opportunity
//           </AppButton>

//           {/* ==================================================
//               DISCARD CHANGES
//               ================================================== */}

//           <AppButton
//             size="small"
//             emphasis="secondary"
//             tone="neutral"
//             startIcon={<DeleteOutlineIcon />}
//             onClick={handleDiscardChanges}
//             sx={{
//               ...followUpActionSx,

//               color: "#718096",

//               border: "1px solid #E2E8F0",

//               backgroundColor: "#FFFFFF",

//               "&:hover": {
//                 backgroundColor: "#F7F9FC",

//                 borderColor: "#CBD5E0",
//               },

//               "@media (max-width:600px)": {
//                 width: "100%",
//               },
//             }}
//           >
//             Discard Changes
//           </AppButton>

//           {/* ==================================================
//               SAVE AS DRAFT
//               ================================================== */}

//           <AppButton
//             size="small"
//             emphasis="secondary"
//             tone="neutral"
//             startIcon={<DraftIcon />}
//             onClick={handleDraft}
//             sx={{
//               ...followUpActionSx,

//               color: "#2563EB",

//               border: "1px solid #C9DDFE",

//               backgroundColor: "#F5F9FF",

//               "&:hover": {
//                 backgroundColor: "#EDF4FF",

//                 borderColor: "#AFCBFA",
//               },

//               "@media (max-width:600px)": {
//                 width: "100%",
//               },
//             }}
//           >
//             Save as Draft
//           </AppButton>

//           {/* ==================================================
//               SUBMIT TRANSACTION
//               ================================================== */}

//           <AppButton
//             size="small"
//             startIcon={<CheckCircleOutlineIcon />}
//             onClick={handleSubmitTransaction}
//             sx={{
//               ...followUpActionSx,

//               minWidth: 145,

//               color: "#FFFFFF",

//               backgroundColor: "#2161F5",

//               border: "1px solid #2161F5",

//               boxShadow: "0 5px 12px rgba(33, 97, 245, 0.18)",

//               "&:hover": {
//                 backgroundColor: "#174FD6",

//                 borderColor: "#174FD6",
//               },

//               "@media (max-width:600px)": {
//                 width: "100%",
//               },
//             }}
//           >
//             Submit Transaction
//           </AppButton>
//         </Stack>
//       </Box>

//       {/* ======================================================
//           ADD MASTER DATA MODAL
//           ====================================================== */}

//       <AppModal
//         open={activeMasterField !== null}
//         onClose={closeMasterDataPopup}
//         title={masterModalTitle}
//         subtitle={
//           activeMasterField === "industry"
//             ? "Create a new industry option"
//             : "Create a new project type option"
//         }
//         size="sm"
//         footer={
//           <Stack direction="row" spacing={1}>
//             {/* CANCEL */}

//             <AppButton
//               size="small"
//               emphasis="secondary"
//               tone="neutral"
//               onClick={closeMasterDataPopup}
//             >
//               Cancel
//             </AppButton>

//             {/* SAVE */}

//             <AppButton
//               size="small"
//               startIcon={<SaveIcon />}
//               onClick={saveMasterValue}
//               disabled={!newMasterValue.trim()}
//             >
//               Save
//             </AppButton>
//           </Stack>
//         }
//       >
//         {/* ====================================================
//             MASTER DATA INPUT
//             ==================================================== */}

//         <AppInput
//           autoFocus
//           label={masterModalInputLabel}
//           value={newMasterValue}
//           onChange={(event) => setNewMasterValue(event.target.value)}
//           onKeyDown={(event) => {
//             // Press Enter to save.
//             if (event.key === "Enter") {
//               event.preventDefault();

//               saveMasterValue();
//             }
//           }}
//         />
//       </AppModal>
//     </Stack>
//   );
// };

// // ============================================================
// // 25. EXPORT PAGE
// // ============================================================

// export default NewLeadPage;


// ============================================================
// NEW LEAD PAGE
// ============================================================
//
// This page is responsible for:
// 1. Creating a new CRM Lead
// 2. Capturing primary lead information
// 3. Capturing classification information
// 4. Capturing additional information
// 5. Capturing follow-up information
// 6. Adding new Industry / Project Type master data
// 7. Saving the lead
// 8. Saving the lead as draft
// 9. Converting the lead to Contact
// 10. Converting the lead to Opportunity
//
// IMPORTANT UI STRUCTURE:
//
// TOP RIGHT:
//    [ Save ] [ Cancel ]
//
// BELOW FOLLOW-UPS:
//    [ Convert to Contact ]
//    [ Convert to Opportunity ]
//    [ Discard Changes ]
//    [ Save as Draft ]
//    [ Submit Transaction ]
//
// IMPORTANT:
// Existing layout, grid, functionality and responsiveness
// are intentionally preserved.
// ============================================================


// ============================================================
// MUI ICONS
// ============================================================

import AddIcon from "@mui/icons-material/AddOutlined";
import CancelIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import OpportunityIcon from "@mui/icons-material/TrendingUpOutlined";
import DraftIcon from "@mui/icons-material/DraftsOutlined";


// ============================================================
// MUI COMPONENTS
// ============================================================

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, type Theme } from "@mui/material/styles";


// ============================================================
// REACT
// ============================================================

import {
  type ChangeEvent,
  type ReactNode,
  useState,
} from "react";


// ============================================================
// REACT ROUTER
// ============================================================

import { useNavigate } from "react-router-dom";


// ============================================================
// CUSTOM UI COMPONENTS
// ============================================================

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";


// ============================================================
// 1. FORM DATA TYPE
// ============================================================

type LeadFormValues = {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;

  industry: string;
  projectType: string;
  leadSource: string;
  status: string;
  assignedTo: string;

  website: string;
  companySize: string;
  annualRevenue: string;

  address: string;
  subsidiary: string;

  projectDescription: string;
  notes: string;
};


// ============================================================
// 2. FOLLOW-UP DATA TYPE
// ============================================================

type FollowUpValues = {
  followUpDate: string;
  nextFollowUpDate: string;
  status: string;
  activityType: string;
  remarks: string;
  attachments: File[];
};


// ============================================================
// 3. FIELD NAME TYPE
// ============================================================

type LeadFieldName = keyof LeadFormValues;


// ============================================================
// 4. FEEDBACK TYPE
// ============================================================

type FeedbackState = {
  severity: "success" | "info";
  text: string;
} | null;


// ============================================================
// 5. SELECT OPTION TYPE
// ============================================================

type SelectOption = {
  value: string;
  label: string;
};


// ============================================================
// 6. TODAY DATE HELPER
// ============================================================

const todayIsoDate = (): string => {
  return new Date().toISOString().split("T")[0] ?? "";
};


// ============================================================
// 7. MASTER DATA FIELD TYPE
// ============================================================

type MasterDataFieldProps = {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  error: string | undefined;
  onChange: (value: string) => void;

  /** Show the add (+) button for this field. */
  allowAdd?: boolean;

  onOpenAdd: () => void;
};


// ============================================================
// 8. SECTION CARD TYPE
// ============================================================

type SectionCardProps = {
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};


// ============================================================
// 9. REQUIRED FIELD LABELS
// ============================================================

const requiredLabels: Record<LeadFieldName, string> = {
  companyName: "Company Name",
  contactPerson: "Contact Person",
  phone: "Phone Number",
  email: "Email",

  industry: "Industry",
  projectType: "Project Type",
  leadSource: "Lead Source",
  status: "Status",
  assignedTo: "Assigned To",

  website: "Website",
  companySize: "Company Size",
  annualRevenue: "Annual Revenue",

  address: "Address",
  subsidiary: "Subsidiary",

  projectDescription: "Project Description",
  notes: "Notes",
};


// ============================================================
// 10. INITIAL LEAD FORM VALUES
// ============================================================

const initialForm: LeadFormValues = {
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",

  industry: "",
  projectType: "",
  leadSource: "",
  status: "New",
  assignedTo: "",

  website: "",
  companySize: "",
  annualRevenue: "",

  address: "",
  subsidiary: "",

  projectDescription: "",
  notes: "",
};


// ============================================================
// 11. INITIAL FOLLOW-UP VALUES
// ============================================================

const initialFollowUp: FollowUpValues = {
  followUpDate: todayIsoDate(),
  nextFollowUpDate: "",
  status: "",
  activityType: "",
  remarks: "",
  attachments: [],
};


// ============================================================
// 12. INDUSTRY MASTER DATA
// ============================================================

const initialIndustries = [
  "Marine",
  "Construction",
  "Manufacturing",
  "Logistics",
  "Technology",
  "Oil & Gas",
  "Healthcare",
  "Finance",
];


// ============================================================
// 13. PROJECT TYPE MASTER DATA
// ============================================================

const initialProjectTypes = [
  "New Business",
  "Maintenance",
  "Upgrade",
];


// ============================================================
// 14. LEAD SOURCE OPTIONS
// ============================================================

const leadSourceOptions = [
  "Exhibition",
  "Referral",
  "Website",
  "Social Media",
];


// ============================================================
// 15. STATUS OPTIONS
// ============================================================

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Disqualified",
  "Converted",
];


// ============================================================
// 16. ASSIGNED TO OPTIONS
// ============================================================

const assignedToOptions = [
  "Priya Sharma",
  "Liam Walker",
  "Arjun Rao",
  "Rahul Menon",
];


// ============================================================
// 17. COMPANY SIZE OPTIONS
// ============================================================

const companySizeOptions = [
  "0–50 employees",
  "50–100 employees",
  "100–150 employees",
  "150–250 employees",
  "250–500 employees",
  "500+ employees",
];


// ============================================================
// 18. ANNUAL REVENUE OPTIONS
// ============================================================

const annualRevenueOptions = [
  "Less than 1M",
  "1M–5M",
  "5M–10M",
  "10M–50M",
  "50M–100M",
  "100M+",
];


// ============================================================
// 19. FOLLOW-UP STATUS OPTIONS
// ============================================================

const followUpStatusOptions = [
  "Pending",
  "Completed",
  "Rescheduled",
  "Cancelled",
];


// ============================================================
// 20. ACTIVITY TYPE OPTIONS
// ============================================================

const activityTypeOptions = [
  "Call",
  "Email",
  "Meeting",
  "Site Visit",
  "WhatsApp",
];


// ============================================================
// 21. SUBSIDIARY OPTIONS
// ============================================================

const subsidiaryOptions: SelectOption[] = [
  {
    value: "TOM Marine Pte Ltd",
    label: "TOM Marine Pte Ltd",
  },
  {
    value: "TOM Offshore Marine Engineering",
    label: "TOM Offshore Marine Engineering",
  },
  {
    value: "TOM Shipyard",
    label: "TOM Shipyard",
  },
  {
    value: "TOM Engineering Services",
    label: "TOM Engineering Services",
  },
];


// ============================================================
// 22. NEW UI FIELD STYLE
// ============================================================
//
// IMPORTANT:
// This only changes the visual appearance of AppInput.
// It does not change dimensions, grid or functionality.
// ============================================================

const fieldInputSx = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#0F172A" : "#F7F9FC",

      borderRadius: "10px",

      transition:
        "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease",

      "& fieldset": {
        borderColor: isDark ? "#243044" : "#E8EDF3",
      },

      "&:hover": {
        backgroundColor: isDark ? "#152238" : "#F5F8FB",

        "& fieldset": {
          borderColor: isDark ? "#334155" : "#DCE4ED",
        },
      },

      "&.Mui-focused": {
        backgroundColor: theme.palette.background.paper,

        "& fieldset": {
          borderColor: theme.palette.primary.main,
          borderWidth: "1px",
        },

        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
      },

      "&.Mui-error": {
        backgroundColor: isDark
          ? alpha(theme.palette.error.main, 0.08)
          : "#FFF8F8",

        "& fieldset": {
          borderColor: theme.palette.error.main,
        },
      },
    },

    "& .MuiInputBase-input": {
      backgroundColor: "transparent",
    },

    "& .MuiSelect-select": {
      backgroundColor: "transparent",
    },

    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 700,
      fontSize: "0.72rem",
      letterSpacing: "0.055em",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main,
    },

    "& .MuiInputLabel-root.Mui-error": {
      color: theme.palette.error.main,
    },

    "& .MuiFormHelperText-root": {
      fontSize: "0.68rem",
      marginLeft: "2px",
    },

    "& textarea": {
      backgroundColor: "transparent",
    },
  };
};


// ============================================================
// 23. SECTION CARD COMPONENT
// ============================================================

function SectionCard({
  title,
  description,
  open,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <AppCard
      disablePadding
      sx={(theme) => ({
        overflow: "hidden",

        // ====================================================
        // CONTAINER BACKGROUND
        // ====================================================

        backgroundColor: theme.palette.background.paper,

        border: `1px solid ${theme.palette.divider}`,

        borderRadius: 2,

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 10px rgba(0, 0, 0, 0.24)"
            : "0 2px 10px rgba(15, 23, 42, 0.03)",
      })}
    >
      {/* ====================================================
          SECTION HEADER
          ==================================================== */}

      <ButtonBase
        onClick={onToggle}
        sx={(theme) => ({
          width: "100%",
          textAlign: "left",

          px: {
            xs: 2,
            md: 2.5,
          },

          py: {
            xs: 1.5,
            md: 1.75,
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          gap: 2,

          backgroundColor: theme.palette.background.paper,

          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        })}
      >
        {/* ==================================================
            TITLE + DESCRIPTION
            ================================================== */}

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.25,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* ==================================================
            OPEN / CLOSE ICON
            ================================================== */}

        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ButtonBase>

      {/* ====================================================
          SECTION CONTENT
          ==================================================== */}

      <Collapse in={open}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,

            p: {
              xs: 2,
              md: 2.5,
            },
          })}
        >
          {children}
        </Box>
      </Collapse>
    </AppCard>
  );
}


// ============================================================
// 24. MASTER DATA FIELD COMPONENT
// ============================================================

function MasterDataField({
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
  allowAdd = false,
  onOpenAdd,
}: MasterDataFieldProps) {
  const selectOptions: SelectOption[] = [
    {
      value: "",
      label: placeholder,
    },

    ...options.map((option) => ({
      value: option,
      label: option,
    })),
  ];

  return (
    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: "minmax(0, 1fr)",

        columnGap: 0,

        alignItems: "start",

        minWidth: 0,

        ...(allowAdd
          ? {
              // ==================================================
              // DESKTOP / LAPTOP
              // ==================================================

              "@media (hover: hover)": {
                gridTemplateColumns: "minmax(0, 1fr) 0px",

                columnGap: 0,

                transition:
                  "grid-template-columns 220ms cubic-bezier(0.22, 1, 0.36, 1), column-gap 220ms cubic-bezier(0.22, 1, 0.36, 1)",

                "&:hover, &:focus-within": {
                  gridTemplateColumns: "minmax(0, 1fr) 42px",

                  columnGap: 1,
                },

                "& .master-add-slot": {
                  width: 0,
                  opacity: 0,
                  overflow: "hidden",

                  transition:
                    "width 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease",
                },

                "&:hover .master-add-slot, &:focus-within .master-add-slot": {
                  width: 42,
                  opacity: 1,
                },

                "& .master-add-btn": {
                  width: 42,
                  minWidth: 42,

                  opacity: 0,

                  transform:
                    "translateX(6px) scale(0.96)",

                  pointerEvents: "none",
                },

                "&:hover .master-add-btn, &:focus-within .master-add-btn": {
                  opacity: 1,

                  transform:
                    "translateX(0) scale(1)",

                  pointerEvents: "auto",
                },
              },

              // ==================================================
              // TOUCH DEVICES
              // ==================================================

              "@media (hover: none)": {
                gridTemplateColumns: "minmax(0, 1fr) 42px",

                columnGap: 1,

                "& .master-add-slot": {
                  width: 42,
                  opacity: 1,
                  overflow: "hidden",
                },

                "& .master-add-btn": {
                  width: 42,
                  minWidth: 42,

                  opacity: 1,

                  transform: "none",

                  pointerEvents: "auto",
                },
              },
            }
          : {}),
      }}
    >
      {/* ====================================================
          DROPDOWN INPUT
          ==================================================== */}

      <AppInput
        label={label}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        options={selectOptions}
        error={Boolean(error)}
        helperText={error ?? " "}
        sx={fieldInputSx}
      />

      {/* ====================================================
          ADD BUTTON
          ==================================================== */}

      {allowAdd && (
        <Box
          className="master-add-slot"
          sx={{
            minWidth: 0,
          }}
        >
          <AppButton
            className="master-add-btn"
            size="small"
            emphasis="secondary"
            tone="neutral"
            onClick={onOpenAdd}
            aria-label={`Add new ${label}`}
            sx={{
              minWidth: 42,
              width: 42,
              height: 40,

              p: 0,
              mt: 0,

              flexShrink: 0,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              transition:
                "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <AddIcon fontSize="small" />
          </AppButton>
        </Box>
      )}
    </Box>
  );
}


// ============================================================
// 25. NEW LEAD PAGE
// ============================================================

const NewLeadPage = () => {
  // ==========================================================
  // ROUTER NAVIGATION
  // ==========================================================

  const navigate = useNavigate();


  // ==========================================================
  // MAIN LEAD FORM STATE
  // ==========================================================

  const [form, setForm] =
    useState<LeadFormValues>(initialForm);


  // ==========================================================
  // FOLLOW-UP STATE
  // ==========================================================

  const [followUp, setFollowUp] =
    useState<FollowUpValues>(initialFollowUp);


  // ==========================================================
  // VALIDATION ERRORS
  // ==========================================================

  const [errors, setErrors] =
    useState<Partial<Record<LeadFieldName, string>>>({});


  // ==========================================================
  // SECTION OPEN / CLOSE STATES
  // ==========================================================

  const [primaryOpen, setPrimaryOpen] = useState(true);

  const [classificationOpen, setClassificationOpen] =
    useState(false);

  const [additionalOpen, setAdditionalOpen] =
    useState(false);

  const [followUpOpen, setFollowUpOpen] =
    useState(false);


  // ==========================================================
  // MASTER DATA
  // ==========================================================

  const [industries, setIndustries] =
    useState(initialIndustries);

  const [projectTypes, setProjectTypes] =
    useState(initialProjectTypes);


  // ==========================================================
  // MASTER DATA POPUP STATE
  // ==========================================================

  const [activeMasterField, setActiveMasterField] =
    useState<"industry" | "projectType" | null>(null);


  // ==========================================================
  // NEW MASTER VALUE
  // ==========================================================

  const [newMasterValue, setNewMasterValue] =
    useState("");


  // ==========================================================
  // FEEDBACK MESSAGE
  // ==========================================================

  const [feedback, setFeedback] =
    useState<FeedbackState>(null);


  // ==========================================================
  // SUBSIDIARY
  // ==========================================================

  const [subsidiaries] =
    useState(subsidiaryOptions);


  // ==========================================================
  // COMPACT BUTTON STYLE
  // ==========================================================

  const followUpActionSx = {
    minHeight: 40,
    height: 40,

    px: 1.75,

    borderRadius: 1.5,

    fontSize: "0.70rem",

    fontWeight: 700,

    lineHeight: 1.2,

    letterSpacing: "0.04em",

    textTransform: "uppercase" as const,

    whiteSpace: "nowrap" as const,

    flexShrink: 0,

    "& .MuiButton-startIcon": {
      marginRight: 0.65,
    },

    "& svg": {
      fontSize: 16,
    },

    // --------------------------------------------------------
    // MOBILE
    // --------------------------------------------------------

    "@media (max-width:600px)": {
      px: 1.25,
      fontSize: "0.65rem",
    },
  };


  // ==========================================================
  // UPDATE LEAD FORM FIELD
  // ==========================================================

  const updateField = (
    field: LeadFieldName,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    // Remove validation error after user edits field.

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = {
        ...current,
      };

      delete next[field];

      return next;
    });
  };


  // ==========================================================
  // UPDATE FOLLOW-UP FIELD
  // ==========================================================

  const updateFollowUp = <
    K extends keyof FollowUpValues
  >(
    field: K,
    value: FollowUpValues[K],
  ) => {
    setFollowUp((current) => ({
      ...current,
      [field]: value,
    }));
  };


  // ==========================================================
  // FOLLOW-UP FILE UPLOAD
  // ==========================================================

  const handleFollowUpFiles = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    updateFollowUp("attachments", files);
  };


  // ==========================================================
  // FORM VALIDATION
  // ==========================================================

  const validate = () => {
    const nextErrors: Partial<
      Record<LeadFieldName, string>
    > = {};

    const trimmedPhone = form.phone.trim();

    const trimmedEmail = form.email.trim();


    // --------------------------------------------------------
    // REQUIRED FIELDS
    // --------------------------------------------------------

    if (!form.companyName.trim()) {
      nextErrors.companyName =
        `${requiredLabels.companyName} is required`;
    }

    if (!form.contactPerson.trim()) {
      nextErrors.contactPerson =
        `${requiredLabels.contactPerson} is required`;
    }

    if (!form.phone.trim()) {
      nextErrors.phone =
        `${requiredLabels.phone} is required`;
    }

    if (!form.email.trim()) {
      nextErrors.email =
        `${requiredLabels.email} is required`;
    }

    if (!form.address.trim()) {
      nextErrors.address =
        `${requiredLabels.address} is required`;
    }


    // --------------------------------------------------------
    // EMAIL VALIDATION
    // --------------------------------------------------------

    if (
      trimmedEmail &&
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
        trimmedEmail,
      )
    ) {
      nextErrors.email =
        "Enter a valid email address";
    }


    // --------------------------------------------------------
    // PHONE VALIDATION
    // --------------------------------------------------------

    if (trimmedPhone) {
      const phonePattern = /^[+()\-\s.\d]+$/;

      const digitCount =
        trimmedPhone.replace(/\D/g, "").length;

      if (
        !phonePattern.test(trimmedPhone) ||
        digitCount < 6
      ) {
        nextErrors.phone =
          "Enter a valid phone number";
      }
    }

    return nextErrors;
  };


  // ==========================================================
  // SAVE LEAD
  // ==========================================================

  const handleSave = () => {
    const nextErrors = validate();

    // Stop if validation fails.

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback(null);

      return;
    }

    // Clear errors.

    setErrors({});

    // Backend-ready payload.

    const payload = {
      ...form,

      followUp: {
        followUpDate:
          followUp.followUpDate,

        nextFollowUpDate:
          followUp.nextFollowUpDate,

        status:
          followUp.status,

        activityType:
          followUp.activityType,

        remarks:
          followUp.remarks,

        attachments:
          followUp.attachments,
      },
    };

    // Temporary console log.

    console.log(
      "New Lead Payload:",
      payload,
    );

    // Success message.

    setFeedback({
      severity: "success",
      text: "Lead saved successfully.",
    });
  };


  // ==========================================================
  // SAVE AS DRAFT
  // ==========================================================

  const handleDraft = () => {
    setErrors({});

    const draftPayload = {
      ...form,
      followUp,
    };

    console.log(
      "Lead Draft:",
      draftPayload,
    );

    setFeedback({
      severity: "info",
      text: "Lead draft saved locally.",
    });
  };


  // ==========================================================
  // CONVERT LEAD TO CONTACT
  // ==========================================================

  const handleConvertToContact = () => {
    setErrors({});

    console.log(
      "Convert Lead to Contact:",
      {
        ...form,
        followUp,
      },
    );

    setFeedback({
      severity: "info",
      text: "Lead conversion to contact is prepared locally.",
    });
  };


  // ==========================================================
  // CONVERT LEAD TO OPPORTUNITY
  // ==========================================================

  const handleConvertToOpportunity = () => {
    setErrors({});

    console.log(
      "Convert Lead to Opportunity:",
      {
        ...form,
        followUp,
      },
    );

    setFeedback({
      severity: "info",
      text: "Lead conversion to opportunity is prepared locally.",
    });
  };


  // ==========================================================
  // DISCARD CHANGES
  // ==========================================================

  const handleDiscardChanges = () => {
    setForm(initialForm);

    setFollowUp({
      ...initialFollowUp,
      followUpDate: todayIsoDate(),
    });

    setErrors({});

    setFeedback({
      severity: "info",
      text: "Changes discarded.",
    });
  };


  // ==========================================================
  // SUBMIT TRANSACTION
  // ==========================================================

  const handleSubmitTransaction = () => {
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback(null);

      return;
    }

    const payload = {
      ...form,
      followUp,
    };

    console.log(
      "Submit Transaction:",
      payload,
    );

    setErrors({});

    setFeedback({
      severity: "success",
      text: "Transaction submitted successfully.",
    });
  };


  // ==========================================================
  // OPEN MASTER DATA POPUP
  // ==========================================================

  const openMasterDataPopup = (
    field: "industry" | "projectType",
  ) => {
    setActiveMasterField(field);
    setNewMasterValue("");
  };


  // ==========================================================
  // CLOSE MASTER DATA POPUP
  // ==========================================================

  const closeMasterDataPopup = () => {
    setActiveMasterField(null);
    setNewMasterValue("");
  };


  // ==========================================================
  // SAVE NEW MASTER DATA
  // ==========================================================

  const saveMasterValue = () => {
    const value = newMasterValue.trim();

    if (!value || !activeMasterField) {
      return;
    }


    // --------------------------------------------------------
    // SAVE NEW INDUSTRY
    // --------------------------------------------------------

    if (activeMasterField === "industry") {
      setIndustries((current) => {
        const alreadyExists =
          current.some(
            (item) =>
              item.toLowerCase() ===
              value.toLowerCase(),
          );

        if (alreadyExists) {
          return current;
        }

        return [...current, value];
      });

      // Automatically select newly added industry.

      updateField("industry", value);
    }


    // --------------------------------------------------------
    // SAVE NEW PROJECT TYPE
    // --------------------------------------------------------

    if (activeMasterField === "projectType") {
      setProjectTypes((current) => {
        const alreadyExists =
          current.some(
            (item) =>
              item.toLowerCase() ===
              value.toLowerCase(),
          );

        if (alreadyExists) {
          return current;
        }

        return [...current, value];
      });

      // Automatically select newly added project type.

      updateField(
        "projectType",
        value,
      );
    }


    // Close modal.

    closeMasterDataPopup();
  };


  // ==========================================================
  // POPUP TITLE
  // ==========================================================

  const masterModalTitle =
    activeMasterField === "industry"
      ? "Add New Industry"
      : "Add New Project Type";


  // ==========================================================
  // POPUP INPUT LABEL
  // ==========================================================

  const masterModalInputLabel =
    activeMasterField === "industry"
      ? "Industry"
      : "Project Type";


  // ==========================================================
  // RETURN UI
  // ==========================================================

  return (
    <Stack
      spacing={{
        xs: 2,
        md: 2.5,
      }}
      sx={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "minmax(0, 1fr) auto",
          },

          gap: 2,

          alignItems: {
            xs: "flex-start",
            lg: "center",
          },

          width: "100%",
        }}
      >
        {/* ====================================================
            PAGE TITLE
            ==================================================== */}

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 0.8,
              fontSize:"10px", 
              textTransform:"capitalize",
              fontWeight:"bold",
              color:"gray",
              letterSpacing:"3px"

            }}
          >
           <span style={{color: "#60A5FA", letterSpacing:"3px"}}>TERMINAL</span> .CRM & CUSTOMER ENGAMGEMENT
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "1.5rem",
              },

              fontWeight: 700,
            }}
          >
            CONTACT INFORMATION 
          </Typography>

         
        </Box>


        {/* ====================================================
            TOP RIGHT ACTION BUTTONS
            ==================================================== */}

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },

            justifyContent: {
              xs: "flex-start",
              lg: "flex-end",
            },

            alignItems: "center",

            flexWrap: "wrap",
          }}
        >
          {/* SAVE */}

          <AppButton
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              minHeight: 40,
              height: 40,

              justifyContent: "center",

              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            Save
          </AppButton>


          {/* CANCEL */}

          <AppButton
            size="small"
            emphasis="secondary"
            tone="neutral"
            startIcon={<CancelIcon />}
            onClick={() =>
              navigate("/crm/leads")
            }
            sx={{
              minHeight: 40,
              height: 40,

              justifyContent: "center",

              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            Cancel
          </AppButton>
        </Stack>
      </Box>


      {/* ======================================================
          FEEDBACK MESSAGE
          ====================================================== */}

      {feedback && (
        <Alert
          severity={feedback.severity}
          icon={
            feedback.severity === "info"
              ? <InfoIcon fontSize="inherit" />
              : undefined
          }
          onClose={() => setFeedback(null)}
        >
          {feedback.text}
        </Alert>
      )}


      {/* ======================================================
          PRIMARY INFORMATION
          ====================================================== */}

      <SectionCard
        title="Primary Information"
        description="Capture the essential lead details"
        open={primaryOpen}
        onToggle={() =>
          setPrimaryOpen(
            (current) => !current,
          )
        }
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(3, minmax(0, 1fr))",
            },

            gap: 2,

            minWidth: 0,
          }}
        >
          {/* COMPANY NAME */}

          <AppInput
            label="Company Name"
            value={form.companyName}
            onChange={(event) =>
              updateField(
                "companyName",
                event.target.value,
              )
            }
            required
            error={Boolean(
              errors.companyName,
            )}
            helperText={
              errors.companyName ?? " "
            }
            sx={fieldInputSx}
          />


          {/* CONTACT PERSON */}

          <AppInput
            label="Contact Person"
            value={form.contactPerson}
            onChange={(event) =>
              updateField(
                "contactPerson",
                event.target.value,
              )
            }
            required
            error={Boolean(
              errors.contactPerson,
            )}
            helperText={
              errors.contactPerson ?? " "
            }
            sx={fieldInputSx}
          />


          {/* PHONE */}

          <AppInput
            label="Phone Number"
            value={form.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value,
              )
            }
            required
            error={Boolean(errors.phone)}
            helperText={
              errors.phone ?? " "
            }
            sx={fieldInputSx}
          />


          {/* EMAIL */}

          <AppInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
            required
            error={Boolean(errors.email)}
            helperText={
              errors.email ?? " "
            }
            sx={fieldInputSx}
          />


          {/* INDUSTRY */}

          <MasterDataField
            label="Industry"
            value={form.industry}
            options={industries}
            placeholder="Select industry"
            error={errors.industry}
            allowAdd
            onChange={(value) =>
              updateField(
                "industry",
                value,
              )
            }
            onOpenAdd={() =>
              openMasterDataPopup(
                "industry",
              )
            }
          />


          {/* PROJECT TYPE */}

          <MasterDataField
            label="Project Type"
            value={form.projectType}
            options={projectTypes}
            placeholder="Select project type"
            error={errors.projectType}
            allowAdd={false}
            onChange={(value) =>
              updateField(
                "projectType",
                value,
              )
            }
            onOpenAdd={() =>
              openMasterDataPopup(
                "projectType",
              )
            }
          />


          {/* LEAD SOURCE */}

          <AppInput
            label="Lead Source"
            value={form.leadSource}
            onChange={(event) =>
              updateField(
                "leadSource",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select lead source",
              },

              ...leadSourceOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText={
              errors.leadSource ?? " "
            }
            sx={fieldInputSx}
          />


          {/* STATUS */}

          <AppInput
            label="Status"
            value={form.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value,
              )
            }
            options={statusOptions.map(
              (option) => ({
                value: option,
                label: option,
              }),
            )}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* ASSIGNED TO */}

          <AppInput
            label="Assigned To"
            value={form.assignedTo}
            onChange={(event) =>
              updateField(
                "assignedTo",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select sales person",
              },

              ...assignedToOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* WEBSITE */}

          <AppInput
            label="Website"
            value={form.website}
            onChange={(event) =>
              updateField(
                "website",
                event.target.value,
              )
            }
            helperText=" "
            sx={fieldInputSx}
          />


          {/* COMPANY SIZE */}

          <AppInput
            label="Company Size"
            value={form.companySize}
            onChange={(event) =>
              updateField(
                "companySize",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select company size",
              },

              ...companySizeOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* ANNUAL REVENUE */}

          <AppInput
            label="Annual Revenue"
            value={form.annualRevenue}
            onChange={(event) =>
              updateField(
                "annualRevenue",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select annual revenue",
              },

              ...annualRevenueOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* ADDRESS */}

          <Box
            sx={{
              gridColumn: {
                xs: "span 1",
                md: "span 3",
              },

              minWidth: 0,
            }}
          >
            <AppInput
              label="Address"
              value={form.address}
              onChange={(event) =>
                updateField(
                  "address",
                  event.target.value,
                )
              }
              required
              multiline
              minRows={3}
              error={Boolean(
                errors.address,
              )}
              helperText={
                errors.address ?? " "
              }
              sx={fieldInputSx}
            />
          </Box>
        </Box>
      </SectionCard>


      {/* ======================================================
          CLASSIFICATION
          ====================================================== */}

      <SectionCard
        title="Classification"
        description="Map the lead to the correct subsidiary"
        open={classificationOpen}
        onToggle={() =>
          setClassificationOpen(
            (current) => !current,
          )
        }
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(3, minmax(0, 1fr))",
            },

            gap: 2,

            minWidth: 0,
          }}
        >
          {/* SUBSIDIARY */}

          <Box
            sx={{
              gridColumn: {
                xs: "span 1",
                md: "span 3",
              },

              minWidth: 0,
            }}
          >
            <AppInput
              label="Subsidiary"
              value={form.subsidiary}
              onChange={(event) =>
                updateField(
                  "subsidiary",
                  event.target.value,
                )
              }
              options={[
                {
                  value: "",
                  label: "Select subsidiary",
                },

                ...subsidiaries,
              ]}
              helperText={
                errors.subsidiary ?? " "
              }
              sx={fieldInputSx}
            />
          </Box>
        </Box>
      </SectionCard>


      {/* ======================================================
          ADDITIONAL INFORMATION
          ====================================================== */}

      <SectionCard
        title="Additional Information"
        description="Capture context, scope and notes"
        open={additionalOpen}
        onToggle={() =>
          setAdditionalOpen(
            (current) => !current,
          )
        }
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            },

            gap: 2,

            minWidth: 0,
          }}
        >
          {/* PROJECT DESCRIPTION */}

          <AppInput
            label="Project Description"
            value={
              form.projectDescription
            }
            onChange={(event) =>
              updateField(
                "projectDescription",
                event.target.value,
              )
            }
            multiline
            minRows={4}
            helperText={
              errors.projectDescription ??
              " "
            }
            sx={fieldInputSx}
          />


          {/* NOTES */}

          <AppInput
            label="Notes"
            value={form.notes}
            onChange={(event) =>
              updateField(
                "notes",
                event.target.value,
              )
            }
            multiline
            minRows={4}
            helperText={
              errors.notes ?? " "
            }
            sx={fieldInputSx}
          />
        </Box>
      </SectionCard>


      {/* ======================================================
          FOLLOW-UPS
          ====================================================== */}

      <SectionCard
        title="Follow-Ups"
        description="Track follow-up activities and next actions"
        open={followUpOpen}
        onToggle={() =>
          setFollowUpOpen(
            (current) => !current,
          )
        }
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            },

            gap: 2,

            minWidth: 0,
          }}
        >
          {/* FOLLOW UP DATE */}

          <AppInput
            label="Follow Up Date"
            type="date"
            value={followUp.followUpDate}
            onChange={(event) =>
              updateFollowUp(
                "followUpDate",
                event.target.value,
              )
            }
            helperText=" "
            sx={fieldInputSx}
          />


          {/* NEXT FOLLOW UP DATE */}

          <AppInput
            label="Next Follow Up Date"
            type="date"
            value={
              followUp.nextFollowUpDate
            }
            onChange={(event) =>
              updateFollowUp(
                "nextFollowUpDate",
                event.target.value,
              )
            }
            helperText=" "
            sx={(theme) => ({
              ...fieldInputSx(theme),

              "& .MuiInputLabel-root": {
                transform:
                  "translate(14px, -9px) scale(0.75)",

                transformOrigin:
                  "top left",

                color: theme.palette.text.secondary,

                fontWeight: 700,

                fontSize: "0.72rem",

                letterSpacing: "0.055em",
              },

              "& .MuiInputLabel-root.Mui-focused":
                {
                  transform:
                    "translate(14px, -9px) scale(0.75)",

                  color: theme.palette.primary.main,
                },
            })}
          />


          {/* FOLLOW UP STATUS */}

          <AppInput
            label="Status"
            value={followUp.status}
            onChange={(event) =>
              updateFollowUp(
                "status",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select Status",
              },

              ...followUpStatusOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* ACTIVITY TYPE */}

          <AppInput
            label="Activity Type"
            value={followUp.activityType}
            onChange={(event) =>
              updateFollowUp(
                "activityType",
                event.target.value,
              )
            }
            options={[
              {
                value: "",
                label: "Select Activity Type",
              },

              ...activityTypeOptions.map(
                (option) => ({
                  value: option,
                  label: option,
                }),
              ),
            ]}
            helperText=" "
            sx={fieldInputSx}
          />


          {/* REMARKS */}

          <Box
            sx={{
              gridColumn: {
                xs: "span 1",
                md: "span 2",
              },

              minWidth: 0,
            }}
          >
            <AppInput
              label="Remarks"
              value={followUp.remarks}
              onChange={(event) =>
                updateFollowUp(
                  "remarks",
                  event.target.value,
                )
              }
              multiline
              minRows={4}
              placeholder="Follow-up notes"
              helperText=" "
              sx={fieldInputSx}
            />
          </Box>


          {/* ATTACHMENTS */}

          <Box
            sx={{
              gridColumn: {
                xs: "span 1",
                md: "span 2",
              },

              minWidth: 0,
            }}
          >
            {/* ATTACHMENTS LABEL */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.75,
                fontWeight: 500,
              }}
            >
              Attachments
            </Typography>


            {/* FILE SELECT AREA */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* CHOOSE FILES BUTTON */}

              <ButtonBase
                component="label"
                sx={{
                  px: 2.5,
                  py: 1.25,

                  borderRadius: 1.5,

                  bgcolor: "action.hover",

                  fontWeight: 600,

                  "&:hover": {
                    bgcolor:
                      "action.selected",
                  },
                }}
              >
                Choose files

                <input
                  type="file"
                  hidden
                  multiple
                  onChange={
                    handleFollowUpFiles
                  }
                />
              </ButtonBase>


              {/* SELECTED FILE COUNT */}

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {followUp.attachments
                  .length === 0
                  ? "No file chosen"
                  : `${followUp.attachments.length} file${
                      followUp.attachments
                        .length > 1
                        ? "s"
                        : ""
                    } selected`}
              </Typography>
            </Box>


            {/* SELECTED FILE NAMES */}

            {followUp.attachments
              .length > 0 && (
              <Stack
                spacing={0.5}
                sx={{
                  mt: 1.5,
                }}
              >
                {followUp.attachments.map(
                  (file, index) => (
                    <Typography
                      key={`${file.name}-${index}`}
                      variant="caption"
                      color="text.secondary"
                    >
                      {file.name}
                    </Typography>
                  ),
                )}
              </Stack>
            )}
          </Box>
        </Box>
      </SectionCard>


      {/* ======================================================
          FOLLOW-UP ACTION BAR
          ====================================================== */}

      <Box
        sx={{
          width: "100%",

          display: "flex",

          // Keep buttons aligned LEFT.

          justifyContent: "flex-start",

          mt: 0.5,

          px: 0,

          minWidth: 0,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
          useFlexGap
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },

            alignItems: {
              xs: "stretch",
              sm: "center",
            },

            justifyContent: "flex-start",

            flexWrap: "wrap",

            minWidth: 0,
          }}
        >
          {/* ==================================================
              CONVERT TO OPPORTUNITY
              ================================================== */}

          <AppButton
            size="small"
            emphasis="secondary"
            tone="neutral"
            startIcon={
              <OpportunityIcon />
            }
            onClick={
              handleConvertToOpportunity
            }
            sx={(theme) => ({
              ...followUpActionSx,

              color: theme.palette.mode === "dark" ? "#4ADE9E" : "#0AAE83",

              border: `1px solid ${
                theme.palette.mode === "dark" ? alpha("#4ADE9E", 0.35) : "#B8EBDD"
              }`,

              backgroundColor:
                theme.palette.mode === "dark" ? alpha("#4ADE9E", 0.12) : "#F3FCF8",

              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? alpha("#4ADE9E", 0.2) : "#E8F9F3",

                borderColor:
                  theme.palette.mode === "dark" ? alpha("#4ADE9E", 0.5) : "#8EDDC5",
              },

              "@media (max-width:600px)":
                {
                  width: "100%",
                },
            })}
          >
            Convert to Opportunity
          </AppButton>


          {/* ==================================================
              DISCARD CHANGES
              ================================================== */}

          <AppButton
            size="small"
            emphasis="secondary"
            tone="neutral"
            startIcon={
              <DeleteOutlineIcon />
            }
            onClick={
              handleDiscardChanges
            }
            sx={(theme) => ({
              ...followUpActionSx,

              color: theme.palette.text.secondary,

              border: `1px solid ${theme.palette.divider}`,

              backgroundColor: theme.palette.background.paper,

              "&:hover": {
                backgroundColor: theme.palette.action.hover,

                borderColor:
                  theme.palette.mode === "dark" ? "#475569" : "#CBD5E0",
              },

              "@media (max-width:600px)":
                {
                  width: "100%",
                },
            })}
          >
            Discard Changes
          </AppButton>


          {/* ==================================================
              SAVE AS DRAFT
              ================================================== */}

          <AppButton
            size="small"
            emphasis="secondary"
            tone="neutral"
            startIcon={<DraftIcon />}
            onClick={handleDraft}
            sx={(theme) => ({
              ...followUpActionSx,

              color: theme.palette.mode === "dark" ? "#8AB4FF" : "#2563EB",

              border: `1px solid ${
                theme.palette.mode === "dark" ? alpha("#8AB4FF", 0.35) : "#C9DDFE"
              }`,

              backgroundColor:
                theme.palette.mode === "dark" ? alpha("#8AB4FF", 0.12) : "#F5F9FF",

              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? alpha("#8AB4FF", 0.2) : "#EDF4FF",

                borderColor:
                  theme.palette.mode === "dark" ? alpha("#8AB4FF", 0.5) : "#AFCBFA",
              },

              "@media (max-width:600px)":
                {
                  width: "100%",
                },
            })}
          >
            Save as Draft
          </AppButton>


          {/* ==================================================
              SUBMIT TRANSACTION
              ================================================== */}

          <AppButton
            size="small"
            startIcon={
              <CheckCircleOutlineIcon />
            }
            onClick={
              handleSubmitTransaction
            }
            sx={{
              ...followUpActionSx,

              minWidth: 145,

              color: "#FFFFFF",

              backgroundColor:
                "#2161F5",

              border:
                "1px solid #2161F5",

              boxShadow:
                "0 5px 12px rgba(33, 97, 245, 0.18)",

              "&:hover": {
                backgroundColor:
                  "#174FD6",

                borderColor:
                  "#174FD6",
              },

              "@media (max-width:600px)": {
                width: "100%",
              },
            }}
          >
            Submit Transaction
          </AppButton>
        </Stack>
      </Box>


      {/* ======================================================
          ADD MASTER DATA MODAL
          ====================================================== */}

      <AppModal
        open={
          activeMasterField !== null
        }
        onClose={
          closeMasterDataPopup
        }
        title={masterModalTitle}
        subtitle={
          activeMasterField ===
          "industry"
            ? "Create a new industry option"
            : "Create a new project type option"
        }
        size="sm"
        footer={
          <Stack
            direction="row"
            spacing={1}
          >
            {/* CANCEL */}

            <AppButton
              size="small"
              emphasis="secondary"
              tone="neutral"
              onClick={
                closeMasterDataPopup
              }
            >
              Cancel
            </AppButton>


            {/* SAVE */}

            <AppButton
              size="small"
              startIcon={<SaveIcon />}
              onClick={saveMasterValue}
              disabled={
                !newMasterValue.trim()
              }
            >
              Save
            </AppButton>
          </Stack>
        }
      >
        {/* ====================================================
            MASTER DATA INPUT
            ==================================================== */}

        <AppInput
          autoFocus
          label={
            masterModalInputLabel
          }
          value={newMasterValue}
          onChange={(event) =>
            setNewMasterValue(
              event.target.value,
            )
          }
          onKeyDown={(event) => {
            // Press Enter to save.

            if (event.key === "Enter") {
              event.preventDefault();

              saveMasterValue();
            }
          }}
          sx={fieldInputSx}
        />
      </AppModal>
    </Stack>
  );
};


// ============================================================
// 26. EXPORT PAGE
// ============================================================

export default NewLeadPage;