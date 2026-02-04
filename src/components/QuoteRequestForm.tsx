import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/extras";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, FileText, Loader2 } from "lucide-react";

interface QuoteFormData {
  // Dados do Cliente
  nomeCompleto: string;
  telefone: string;
  email: string;
  // Dados do Evento
  tipoEvento: string;
  dataEvento: string;
  horarioPrevisto: string;
  localEvento: string;
  numeroConvidados: string;
  // Observações
  observacoes: string;
}

interface QuoteRequestFormProps {
  onBack: () => void;
  onSubmit: (data: QuoteFormData, referenceNumber: string) => void;
}

const initialFormData: QuoteFormData = {
  nomeCompleto: "",
  telefone: "+351 ",
  email: "",
  tipoEvento: "",
  dataEvento: "",
  horarioPrevisto: "",
  localEvento: "",
  numeroConvidados: "",
  observacoes: "",
};

const PHONE_PREFIX = "+351 ";

// Validate Portuguese mobile number: must be 9 digits starting with 9
const isValidPortugueseMobile = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, "").slice(3); // Remove +351 and get remaining digits
  return digitsOnly.length === 9 && digitsOnly.startsWith("9");
};

const eventTypes = [
  { value: "casamento", label: "Casamento" },
  { value: "aniversario", label: "Aniversário" },
  { value: "corporativo", label: "Evento Corporativo" },
  { value: "privado", label: "Evento Privado" },
  { value: "outro", label: "Outro" },
];

const QuoteRequestForm = ({ onBack, onSubmit }: QuoteRequestFormProps) => {
  const { items, subtotal } = useCart();
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSubmitError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure prefix is always present
    if (!value.startsWith(PHONE_PREFIX)) {
      value = PHONE_PREFIX;
    }
    
    // Extract digits after prefix
    const afterPrefix = value.slice(PHONE_PREFIX.length);
    const digitsOnly = afterPrefix.replace(/\D/g, "");
    
    // Limit to 9 digits
    const limitedDigits = digitsOnly.slice(0, 9);
    
    // Format: +351 XXX XXX XXX
    let formatted = PHONE_PREFIX;
    if (limitedDigits.length > 0) {
      formatted += limitedDigits.slice(0, 3);
    }
    if (limitedDigits.length > 3) {
      formatted += " " + limitedDigits.slice(3, 6);
    }
    if (limitedDigits.length > 6) {
      formatted += " " + limitedDigits.slice(6, 9);
    }
    
    setFormData((prev) => ({ ...prev, telefone: formatted }));
    
    // Clear error when user types
    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: "" }));
    }
    setSubmitError(null);
  };

  const handlePhoneBlur = () => {
    // Restore prefix if field was cleared
    if (!formData.telefone || formData.telefone.trim() === "" || formData.telefone === "+351") {
      setFormData((prev) => ({ ...prev, telefone: PHONE_PREFIX }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};
    
    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Campo obrigatório";
    }
    if (!formData.telefone.trim() || formData.telefone === PHONE_PREFIX) {
      newErrors.telefone = "Campo obrigatório";
    } else if (!isValidPortugueseMobile(formData.telefone)) {
      newErrors.telefone = "Introduza um número de telemóvel português válido (ex.: +351 912 345 678)";
    }
    if (!formData.tipoEvento) {
      newErrors.tipoEvento = "Selecione o tipo de evento";
    }
    if (!formData.dataEvento) {
      newErrors.dataEvento = "Campo obrigatório";
    }
    if (!formData.localEvento.trim()) {
      newErrors.localEvento = "Campo obrigatório";
    }
    if (!formData.numeroConvidados || parseInt(formData.numeroConvidados) < 1) {
      newErrors.numeroConvidados = "Indique o número de convidados";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReferenceNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `DLM-${year}${month}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Build payload for Netlify function
      const packageItem = items.find((item) => item.type === "package");
      const extras = items
        .filter((item) => item.type === "extra" && item.groupKey !== "bubble_panel")
        .map((item) => `${item.name} x${item.qty}`);
      const bubbleItem = items.find((item) => item.groupKey === "bubble_panel");
      if (bubbleItem) {
        extras.push(bubbleItem.name);
      }

      const payload = {
        nome: formData.nomeCompleto.trim(),
        whatsapp: formData.telefone.replace(/\s/g, ""), // Remove spaces for +3519XXXXXXXX
        email: formData.email.trim() || undefined,
        tipo_evento: eventTypes.find((t) => t.value === formData.tipoEvento)?.label || formData.tipoEvento,
        data_evento: formData.dataEvento,
        hora_evento: formData.horarioPrevisto || undefined,
        local_evento: formData.localEvento.trim(),
        num_convidados: parseInt(formData.numeroConvidados),
        pacote: packageItem?.name || "Sem pacote",
        itens: {
          ...(extras.length > 0 ? { extras } : {}),
        },
        subtotal_estimado: subtotal,
        observacoes: formData.observacoes.trim() || undefined,
      };

      const response = await fetch("/.netlify/functions/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || result.errors?.join(", ") || "Erro ao submeter pedido");
      }

      const referenceNumber = generateReferenceNumber();
      onSubmit(formData, referenceNumber);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Falha ao processar o pedido. Tente novamente ou contacte-nos via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof QuoteFormData) =>
    `w-full px-4 py-3 bg-background border ${
      errors[fieldName] ? "border-destructive" : "border-border"
    } font-body text-sm focus:outline-none focus:border-gold transition-colors`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="border-b border-border pb-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm">Voltar ao carrinho</span>
        </button>
        <h2 className="font-display text-2xl text-foreground font-light">
          Pedido de Orçamento
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Preencha os dados para solicitar o seu orçamento personalizado
        </p>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto pr-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do Cliente */}
          <section>
            <h3 className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Dados do Cliente
            </h3>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  placeholder="Nome completo *"
                  className={inputClasses("nomeCompleto")}
                />
                {errors.nomeCompleto && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.nomeCompleto}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Telefone / WhatsApp *"
                  className={inputClasses("telefone")}
                />
                {errors.telefone && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.telefone}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email (opcional)"
                  className={inputClasses("email")}
                />
              </div>
            </div>
          </section>

          {/* Dados do Evento */}
          <section>
            <h3 className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Dados do Evento
            </h3>
            <div className="space-y-3">
              <div>
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleChange}
                  className={`${inputClasses("tipoEvento")} ${
                    !formData.tipoEvento ? "text-muted-foreground" : ""
                  }`}
                >
                  <option value="">Tipo de evento *</option>
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.tipoEvento && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.tipoEvento}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="dataEvento"
                    value={formData.dataEvento}
                    onChange={handleChange}
                    className={inputClasses("dataEvento")}
                  />
                  {errors.dataEvento && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.dataEvento}</p>
                  )}
                </div>
                <div>
                  <input
                    type="time"
                    name="horarioPrevisto"
                    value={formData.horarioPrevisto}
                    onChange={handleChange}
                    placeholder="Horário"
                    className={inputClasses("horarioPrevisto")}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="localEvento"
                  value={formData.localEvento}
                  onChange={handleChange}
                  placeholder="Local do evento *"
                  className={inputClasses("localEvento")}
                />
                {errors.localEvento && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.localEvento}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="numeroConvidados"
                  value={formData.numeroConvidados}
                  onChange={handleChange}
                  placeholder="Número de convidados *"
                  min="1"
                  className={inputClasses("numeroConvidados")}
                />
                {errors.numeroConvidados && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.numeroConvidados}</p>
                )}
              </div>
            </div>
          </section>

          {/* Observações */}
          <section>
            <h3 className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Observações
            </h3>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Observações adicionais (opcional)"
              rows={3}
              className={inputClasses("observacoes")}
            />
          </section>

          {/* Cart Summary (Read-only) */}
          <section className="bg-muted/30 border border-border p-4">
            <h3 className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Resumo do Pedido
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between font-body text-sm">
                  <span className="text-foreground">
                    {item.name} <span className="text-muted-foreground">×{item.qty}</span>
                  </span>
                  <span className="text-muted-foreground">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between">
              <span className="font-body text-sm font-medium text-foreground">Subtotal estimado</span>
              <span className="font-display text-lg text-gold">{formatPrice(subtotal)}</span>
            </div>
          </section>

          {/* Submit Error */}
          {submitError && (
            <div className="bg-destructive/10 border border-destructive/30 p-3 text-center">
              <p className="font-body text-sm text-destructive">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold-flat font-body text-[11px] uppercase tracking-[0.15em] py-4 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                A processar...
              </>
            ) : (
              "Submeter pedido de orçamento"
            )}
          </button>

          <p className="font-body text-[10px] text-muted-foreground/70 text-center">
            O pedido de orçamento não constitui compromisso e está sujeito a confirmação de disponibilidade.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default QuoteRequestForm;
