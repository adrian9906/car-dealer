"use client";

import { Vehicle } from "@/app/dealer/inventario/page";
import {
  CheckCircle,
  Circle,
  CreditCard,
  Headphones,
  HomeIcon,
  Landmark,
  Lock,
  Pin,
  RockingChair,
  Shield,
  Truck,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { CreateVenta } from "@/lib/actions/actions";
import { toast } from "sonner";
import { Venta } from "@/lib/types";
const WHEELS = [
  {
    name: '21" Aero Blade',
    price: 0,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7EzICfEYrWAcOpUQ05z7uxeRUmxUqSMw_q5BpxCI984Fy02ib7bNkVLn0N0WAdn6smF4jmNIJ-JMoXUoovWrWMhqtAnFz14BQNUIJO_MwcyD2yNVZOXdteikHYFzMZfV3zrokQIoZhX-gytZvdxuVErLsaKI3cf0UIp6S7rJ-t7gmhIKo0LpgTksp77Ceq_ZPGJxzzw8zIcFivdApSaJ5NKzO0YXIjky3Jl477-yY40DXpimb6up-7c4m3S1q9_8F5_LVruIz4Ho",
  },
  {
    name: '22" Carbon Forge',
    price: 4500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB399rMwsDnCYErWI2Rdrgm3WpRdhIoEL4TMoWFk_EUqnndDebOMvppt8cpvo7txbjCBF5zr5pHTalEjlMJovHGu8XOgkVSvgIyd3DoY4RBR8Teso8XUbcAHBT2mGycZSu_GLC0np7jP1uKYp2_Sv2IVQMCDi_AcsH4n6XLuYogRLIwckUhFJ0hJJgXrE0CEzXbrawhW02_tcrGg_HAGlz7AcqAwwWKpVWiN9zvsoG1V4_bwPmz2T3hyPaGrDPF_QawECdM5XBcEIU",
  },
  {
    name: '20" Stealth V',
    price: 2200,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTXZFRJV2wK1JsVFvWw-WyGwCeuvK5t9ov7P0Gmzix56jr8HGs1e-5v7s-SQNfcM9NakidwoqFsyGc3GfdZNXmtb3g906SAR7Z5cIqbv93E5xIhZxrzlfDFMwC4vIKPEZYxm-4f3QhxME8iOrV6Jeswm-JDktJRZlGiNgZc8Rb9g114l4dFRJLSlLo_r0tWVdXevr8dyQsb4wpDpMgXtWLuamHD9Ku1hrnAQN4QTXAqINkBzEyUXtGxRpGS63l-lxrfSXwGHBFwoo",
  },
];

const INTERIORS = [
  {
    name: "Nappa Graphite",
    desc: "Cuero vegano premium sostenible en carbón profundo con costura cobalto.",
    price: 0,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCjjxtqFCwhKOWyxEtKQZUYLKL3jOO84JUaFUddlXXu1x7ZAQ8nRhmsXyGOup2xcZ96m7AQ6sOQ7a3cioTRBf73F4zgNa_ElTwOhMhw5Q0EMlHeVizckiaVDWsL05rB3CtzryiEmkvNr4EgsfPXjFEZlHbdBtFRhVp2BFg8xKPYvY21af6X4OnDXQjpGSscUHhS37qtcaK-cNDI81GSloTg5Hl4d9wScxSEnmfzblzMuMw72h9dNUtJNif87wvSCZvSTMpMky0JjA",
  },
  {
    name: "Arctic Oak",
    desc: "Asientos blancos con acabado en roble natural recuperado y acentos de níquel cepillado.",
    price: 3800,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDhyWHabCgD7w3SFfMbSlRkXzo8yB52RSY9PpoNOTENcFqc2QnnKOrAzKrkP576HL5pG5DRu-GsxNxLZ-z9NOL0-QX4gUgdkCcc6AyzgN4y6T7mmeqOSQW5Lez1KhHq_nUzZO34qkpthBqJzVrnjhKMuqy_CPMinFFoG7dhkPkzM50uu2cSH6GXTgYJCPkH3EI3n1FyfKE16ZL1Q3u33lRAFmlbyDeufIDM9Ejhcy1ymnGy2MEbKX9zcLHOPRQ_MLXZmxvY-xLRQ4",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
interface PagoForm {
  metodo: "TARJETA" | "TRANSFERENCIA";
  titular: string;
  numero: string;
  expiry: string;
  cvv: string;
  terminos: boolean;
}

type EntregaType = "SHOWROOM" | "DOMICILIO";
type Step = 1 | 2 | 3;

interface Configuracion {
  colorIndex: number;
  wheelIndex: number;
  interiorIndex: number;
}
export interface ClienteForm {
  nombre: string;
  apellidos: string;
  ci: string;
  direccion: string;
  telefono: string;
  email: string;
  tipo_cliente: "NACIONAL" | "EXTRANJERO" | "IMPORTADOR";
}
function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// Formatea expiración MM/YY
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
  return digits;
}

// ── Componentes auxiliares ────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-[10px] text-muted-foreground/70 uppercase px-1 tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-background border border-border/40 rounded-xl py-4 px-5 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder-muted-foreground/30 transition-all duration-200";
/**
 * Intenta mapear el color en texto libre del vehículo a una clase CSS de Tailwind.
 * Si no se reconoce, devuelve un gris neutro.
 */
function colorToTailwind(colorStr: string): string {
  const c = colorStr.toLowerCase();
  if (c.includes("negro") || c.includes("black")) return "bg-stone-900";
  if (c.includes("blanc") || c.includes("white")) return "bg-slate-100";
  if (c.includes("rojo") || c.includes("red") || c.includes("crim"))
    return "bg-red-700";
  if (c.includes("azul") || c.includes("blue")) return "bg-blue-800";
  if (
    c.includes("gris") ||
    c.includes("gray") ||
    c.includes("grey") ||
    c.includes("silver") ||
    c.includes("plata")
  )
    return "bg-zinc-400";
  if (c.includes("verde") || c.includes("green")) return "bg-emerald-700";
  if (c.includes("amarill") || c.includes("yellow")) return "bg-yellow-400";
  if (c.includes("naranj") || c.includes("orange")) return "bg-orange-500";
  if (c.includes("morad") || c.includes("purpl") || c.includes("violet"))
    return "bg-violet-700";
  if (c.includes("caf") || c.includes("brown") || c.includes("beige"))
    return "bg-amber-800";
  return "bg-zinc-500";
}

/** Formatea el kilometraje con separador de miles */
function formatKm(km: number) {
  return km.toLocaleString("es-MX") + " km";
}

export function CotizarComponent({ vehicle }: { vehicle: Vehicle | null }) {
  const [step, setStep] = useState<Step>(1);
  const [showSummary, setShowSummary] = useState(false);
  const [venta, setVenta] = useState<Venta | null>(null);

  // ── Paso 1: Configuración ──
  const vehicleColorEntry = {
    name: vehicle?.color,
    bg: colorToTailwind(vehicle?.color || ""),
    price: 0,
    isBase: true,
  };
  const extraColors = [
    { name: "Blanco Glaciar", bg: "bg-slate-100", price: 1500, isBase: false },
    { name: "Negro Furtivo", bg: "bg-stone-900", price: 1500, isBase: false },
    { name: "Rojo Carmesí", bg: "bg-red-700", price: 2000, isBase: false },
    {
      name: "Plata Quicksilver",
      bg: "bg-zinc-400",
      price: 2000,
      isBase: false,
    },
  ].filter((c) => c.bg !== vehicleColorEntry.bg);

  const ALL_COLORS = [vehicleColorEntry, ...extraColors];

  const [config, setConfig] = useState<Configuracion>({
    colorIndex: 0,
    wheelIndex: 0,
    interiorIndex: 0,
  });

  // ── Paso 2: Cliente ──
  const [cliente, setCliente] = useState<ClienteForm>({
    nombre: "",
    apellidos: "",
    ci: "",
    direccion: "",
    telefono: "",
    email: "",
    tipo_cliente: "NACIONAL",
  });
  const [entrega, setEntrega] = useState<EntregaType>("DOMICILIO");
  const [clienteErrors, setClienteErrors] = useState<
    Partial<Record<keyof ClienteForm, string>>
  >({});

  // ── Paso 3: Pago ──
  const [pago, setPago] = useState<PagoForm>({
    metodo: "TARJETA",
    titular: "",
    numero: "",
    expiry: "",
    cvv: "",
    terminos: false,
  });
  const [pagoErrors, setPagoErrors] = useState<
    Partial<Record<keyof PagoForm, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  // ── Cálculos de precio ──
  const basePrice = vehicle?.precio_venta ?? 0;
  const addons =
    ALL_COLORS[config.colorIndex].price +
    WHEELS[config.wheelIndex].price +
    INTERIORS[config.interiorIndex].price;
  const logistica = entrega === "DOMICILIO" ? 2100 : 0;
  const taxRate = 0.08;
  const subtotal = basePrice + addons + logistica;
  const impuestos = Math.round(subtotal * taxRate);
  const total = subtotal + impuestos;
  const monthly = Math.round(total / 78);

  // ── Validación paso 2 ──
  function validateCliente(): boolean {
    const e: Partial<Record<keyof ClienteForm, string>> = {};
    if (!cliente.nombre.trim()) e.nombre = "Campo requerido";
    if (!cliente.apellidos.trim()) e.apellidos = "Campo requerido";
    if (!cliente.ci.trim()) e.ci = "Campo requerido";
    if (!cliente.email.trim()) e.email = "Campo requerido";
    else if (!/\S+@\S+\.\S+/.test(cliente.email)) e.email = "Email inválido";
    if (!cliente.telefono.trim()) e.telefono = "Campo requerido";
    if (!cliente.direccion.trim()) e.direccion = "Campo requerido";
    setClienteErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Validación paso 3 ──
  function validatePago(): boolean {
    const e: Partial<Record<keyof PagoForm, string>> = {};
    if (pago.metodo === "TARJETA") {
      if (!pago.titular.trim()) e.titular = "Campo requerido";
      if (pago.numero.replace(/\s/g, "").length < 16)
        e.numero = "Número inválido";
      if (pago.expiry.length < 4) e.expiry = "Fecha inválida";
      if (pago.cvv.length < 3) e.cvv = "CVV inválido";
    }
    if (!pago.terminos) e.terminos = "Debes aceptar los términos";
    setPagoErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validatePago()) return;
    setSubmitting(true);
    if (!vehicle)
      return toast.error("No se encontró el vehículo seleccionado.");
    try {
      const venta = await CreateVenta(vehicle?.id_auto, pago.metodo, cliente);
      if (venta) {
        setShowSummary(true);
        setVenta(venta);
        toast.success("¡Cotización realizada con éxito!");
      }
    } catch (error) {
      toast.error(
        "Hubo un error al procesar la cotización: " +
          (error instanceof Error ? error.message : "Error desconocido"),
      );
    }
    setSubmitting(false);
  }

  // ── Barra de progreso ──
  const STEPS = [
    { n: 1, label: "Configuración" },
    { n: 2, label: "Datos" },
    { n: 3, label: "Pago" },
  ];
  const progressPct = step === 1 ? "40%" : step === 2 ? "60%" : "80%";

  // ── Sidebar compartida ────────────────────────────────────────────────────

  const SummarySidebar = () => (
    <aside className="lg:col-span-4">
      <div className="sticky top-28 space-y-5">
        <div className="bg-muted rounded-2xl p-6 shadow-2xl border border-border/10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
          <p className="font-mono text-[10px] tracking-[0.3em] text-primary mb-5 uppercase">
            Vista Previa del Pedido
          </p>
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {vehicle?.año} {vehicle?.marca} {vehicle?.modelo}
              </span>
              <span className="font-bold font-mono">
                {basePrice > 0 ? formatCurrency(basePrice) : "—"}
              </span>
            </div>
            {addons > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opciones</span>
                <span className="font-bold font-mono">
                  +{formatCurrency(addons)}
                </span>
              </div>
            )}
            {logistica > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logística</span>
                <span className="font-bold font-mono">
                  {formatCurrency(logistica)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impuesto (8%)</span>
              <span className="font-bold font-mono">
                {formatCurrency(impuestos)}
              </span>
            </div>
          </div>
          <div className="pt-5 border-t border-border/15 flex justify-between items-end">
            <div>
              <p className="font-mono text-[9px] text-muted-foreground/50 uppercase mb-1">
                Total
              </p>
              <p className="text-2xl font-black">
                {basePrice > 0 ? formatCurrency(total) : "A consultar"}
              </p>
            </div>
            {basePrice > 0 && (
              <div className="text-right">
                <p className="font-mono text-[9px] text-muted-foreground/50 uppercase mb-1">
                  Desde
                </p>
                <p className="text-base font-bold text-blue-300">
                  {formatCurrency(monthly)}
                  <span className="text-[10px] font-normal">/mes</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {step >= 2 && (
          <div className="bg-muted rounded-xl p-4 border border-border/10 space-y-2 text-xs">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Configuración
            </p>
            {[
              { label: "Color", val: ALL_COLORS[config.colorIndex].name },
              { label: "Rines", val: WHEELS[config.wheelIndex].name },
              { label: "Interior", val: INTERIORS[config.interiorIndex].name },
              {
                label: "Entrega",
                val: entrega === "DOMICILIO" ? "Domicilio" : "Showroom",
              },
            ].map((r) => (
              <div key={r.label} className="flex justify-between">
                <span className="text-muted-foreground font-mono uppercase text-[10px]">
                  {r.label}
                </span>
                <span className="font-medium">{r.val}</span>
              </div>
            ))}
          </div>
        )}

        {step === 3 && cliente.nombre && (
          <div className="bg-muted rounded-xl p-4 border border-border/10 space-y-2 text-xs">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Cliente
            </p>
            {[
              {
                label: "Nombre",
                val: `${cliente.nombre} ${cliente.apellidos}`,
              },
              { label: "Email", val: cliente.email },
              { label: "Teléfono", val: cliente.telefono },
            ].map((r) => (
              <div key={r.label} className="flex justify-between gap-2">
                <span className="text-muted-foreground font-mono uppercase text-[10px] shrink-0">
                  {r.label}
                </span>
                <span className="font-medium text-right truncate">{r.val}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-[10px] text-muted-foreground/40 font-mono uppercase px-4 leading-relaxed">
          Datos cifrados AES-256. Solo para verificación de transacción.
        </p>
      </div>
    </aside>
  );
  if (showSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex-1 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-foreground border border-foreground/20 rounded-full mb-6">
                <CheckCircle className="w-4 h-4" />
                <span className="mono text-sm tracking-widest uppercase font-bold">
                  Compra Exitosa
                </span>
              </div>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                ¡Gracias por tu compra! Tu compra ha sido procesada
                exitosamente. Un representante se pondrá en contacto contigo en
                breve para coordinar los detalles de la entrega y cualquier
                pregunta que puedas tener.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-accent rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mono text-xs text-white mb-2">
                    Unique Order: {venta?.id_venta || "—"}
                  </div>
                  <div className="flex flex-wrap gap-12">
                    <div>
                      <div className="mono text-sm text-outline mb-1 uppercase tracking-widest">
                        Vehículo
                      </div>
                      <div className="font-bold text-white">
                        {vehicle?.año} {vehicle?.marca} {vehicle?.modelo}
                      </div>
                    </div>
                    <div>
                      <div className="mono text-sm text-outline mb-1 uppercase tracking-widest">
                        Estado
                      </div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Procesado
                      </div>
                    </div>
                    <div>
                      <div className="mono text-sm text-outline mb-1 uppercase tracking-widest">
                        Fecha estimada de entrega
                      </div>
                      <div className="font-bold text-white">Oct 14, 2026</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 blur-3xl -mr-20 -mt-20"></div>
                {/* <div className="mt-12 flex gap-4 relative z-10">
                  <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all duration-300">
                    <span className="material-symbols-outlined text-base">
                      download
                    </span>
                    Download Receipt
                  </button>
                  <button className="bg-surface-container-highest text-on-surface-variant px-8 py-3 rounded-lg font-bold text-sm hover:text-on-surface transition-all duration-300">
                    Manage Account
                  </button>
                </div> */}
              </div>

              <div className="md:col-span-1 bg-surface-container-low rounded-xl overflow-hidden relative min-h-[300px] md:min-h-0">
                <img
                  className="w-full h-full object-cover opacity-60"
                  data-alt="Close-up of a high-end sport car's carbon ceramic brake and black alloy rim with dramatic moody lighting in a dark showroom"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeZ1OGUmJ-Dp6OrLj972H1sZ7KnKsKtrNYBnDig3lmV0EtaaFRrcpApsAbYOvJwrF6sLJt9pJKG02bhoND6JYYTO0b_I_Ml7vfG0PSCY7hWm43rxkR3gJsmBadnH5H2W4xm-rZ-FBYKYIMD9Vh0wHGD30L-27ilOQqBBywNSHDC_kXrBnExe7Qtczv1TzYxuntsDz1XFxKho6TL0w-qF04DmkYNyeF-Qd0YhLqedu526dytg-LpyKMiG1qbZ-RxL1ubT5UKLqE8jo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mono text-[10px] text-secondary-fixed-dim uppercase mb-1">
                    Venta del auto ID #{vehicle?.id_auto}
                  </div>
                  <div className="font-bold text-on-surface">
                    {vehicle?.marca} {vehicle?.modelo} #{vehicle?.id_auto}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <main className="pt-24 min-h-screen px-4 md:px-12 pb-16 max-w-7xl mx-auto">
      {/* ── Barra de progreso ── */}
      <div className="mb-10 flex items-center gap-4">
        <span className="font-mono text-[10px] text-primary tracking-widest uppercase whitespace-nowrap">
          Estado del Proceso
        </span>
        <div className="flex-1 h-[2px] bg-border/30 relative rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: progressPct }}
          />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase whitespace-nowrap">
          Paso 0{step} / 05
        </span>
      </div>

      {/* ── Header ── */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          {step === 1 && (
            <>
              <div className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-2">
                Paso 01 — Configuración del Vehículo
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-2">
                {vehicle?.marca}{" "}
                <span className="text-primary">{vehicle?.modelo}</span>
              </h1>
              <p className="text-muted-foreground text-base font-light">
                {vehicle?.descripcion ??
                  `Configura tu ${vehicle?.año} ${vehicle?.marca} ${vehicle?.modelo}.`}
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <div className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-2">
                Paso 02 — Información Personal
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-2">
                Datos <span className="text-primary">Personales</span>
              </h1>
              <p className="text-muted-foreground text-base font-light">
                Asegura tu reserva proporcionando tus datos de contacto y
                preferencia de entrega.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <div className="font-mono text-sm text-primary tracking-widest uppercase mb-2">
                Paso 03 — Revisión y Pago
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase">
                Finalizar Pedido
              </h1>
              <p className="text-muted-foreground text-base font-light">
                Revisa los detalles de tu orden y elige tu método de pago para
                completar la reserva.
              </p>
            </>
          )}
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-2 font-mono text-sm shrink-0">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  s.n < step
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : s.n === step
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {s.n < step ? "✓" : s.n}
              </div>
              {s.n < STEPS.length && (
                <div
                  className={`w-7 h-px transition-colors ${s.n < step ? "bg-primary/40" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ══════════════════════════════════════════════════════════════════
            PASO 1 — Configuración
        ══════════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <>
            <div className="lg:col-span-8 space-y-12">
              {/* Showcase */}
              <section className="relative aspect-[21/9] bg-muted rounded-xl overflow-hidden group">
                {vehicle?.imagen ? (
                  <img
                    src={vehicle?.imagen}
                    alt={`${vehicle?.marca} ${vehicle?.modelo}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-mono">
                    Sin imagen disponible
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
                  {[
                    {
                      label: "Kilometraje",
                      value: formatKm(vehicle?.kilometraje || 0),
                    },
                    { label: "Transmisión", value: vehicle?.transmision },
                    { label: "Combustible", value: vehicle?.tipo_combustible },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-background/60 backdrop-blur-md px-4 py-2 rounded flex flex-col border border-border/20"
                    >
                      <span className="text-[10px] font-mono text-primary uppercase">
                        {spec.label}
                      </span>
                      <span className="text-sm font-bold leading-tight">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="space-y-10">
                {/* 01 — Color */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      01 //
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-widest">
                      Acabado Exterior
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {ALL_COLORS.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() =>
                          setConfig((c) => ({ ...c, colorIndex: i }))
                        }
                        className={`flex flex-col items-center gap-3 transition-opacity ${config.colorIndex === i ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full p-1 border-2 transition-all ${config.colorIndex === i ? "border-primary" : "border-border"}`}
                        >
                          <div
                            className={`w-full h-full rounded-full shadow-inner ${color.bg}`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-center leading-tight">
                          {color.name}
                          {color.isBase && (
                            <span className="block text-primary text-[9px]">
                              Original
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 02 — Rines */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      02 //
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-widest">
                      Selección de Rines
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {WHEELS.map((wheel, i) => (
                      <button
                        key={wheel.name}
                        onClick={() =>
                          setConfig((c) => ({ ...c, wheelIndex: i }))
                        }
                        className={`bg-muted p-4 rounded-xl border-2 group cursor-pointer text-left transition-all ${config.wheelIndex === i ? "border-primary" : "border-transparent hover:border-primary/40"}`}
                      >
                        <img
                          src={wheel.img}
                          alt={wheel.name}
                          className={`w-full aspect-square object-cover rounded-lg mb-4 transition-all ${config.wheelIndex === i ? "grayscale-0" : "grayscale group-hover:grayscale-0"}`}
                        />
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs uppercase">
                            {wheel.name}
                          </span>
                          <span
                            className={`text-xs font-mono ${wheel.price === 0 ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {wheel.price === 0
                              ? "Incluido"
                              : `+${formatCurrency(wheel.price)}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 03 — Interior */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      03 //
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-widest">
                      Ambiente Interior
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INTERIORS.map((interior, i) => (
                      <button
                        key={interior.name}
                        onClick={() =>
                          setConfig((c) => ({ ...c, interiorIndex: i }))
                        }
                        className={`bg-muted flex gap-4 p-4 rounded-xl border-2 transition-all text-left ${config.interiorIndex === i ? "border-primary/50" : "border-transparent hover:bg-muted/80"}`}
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={interior.img}
                            alt={interior.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-sm uppercase mb-1">
                            {interior.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {interior.desc}
                          </p>
                          <span
                            className={`font-mono text-[10px] ${config.interiorIndex === i ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {config.interiorIndex === i && interior.price === 0
                              ? "SELECCIÓN ACTIVA"
                              : interior.price === 0
                                ? "Incluido"
                                : `+${formatCurrency(interior.price)}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-sm"
              >
                <span>Continuar al Paso 2 — Datos Personales</span>
                <span>→</span>
              </button>
            </div>
            <SummarySidebar />
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            PASO 2 — Información personal
        ══════════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <>
            <section className="lg:col-span-8 space-y-10">
              {/* Identidad */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary">
                    <User />
                  </span>
                  <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Verificación de Identidad
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Nombre(s)">
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Ej. Alexander"
                      value={cliente.nombre}
                      onChange={(e) =>
                        setCliente((c) => ({ ...c, nombre: e.target.value }))
                      }
                    />
                    {clienteErrors.nombre && (
                      <p className="text-red-400 text-[10px] font-mono mt-1">
                        {clienteErrors.nombre}
                      </p>
                    )}
                  </Field>
                  <Field label="Apellidos">
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Ej. Vance García"
                      value={cliente.apellidos}
                      onChange={(e) =>
                        setCliente((c) => ({ ...c, apellidos: e.target.value }))
                      }
                    />
                    {clienteErrors.apellidos && (
                      <p className="text-red-400 text-[10px] font-mono mt-1">
                        {clienteErrors.apellidos}
                      </p>
                    )}
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Cédula / Pasaporte (CI)">
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Ej. 95120112345"
                      value={cliente.ci}
                      onChange={(e) =>
                        setCliente((c) => ({ ...c, ci: e.target.value }))
                      }
                    />
                    {clienteErrors.ci && (
                      <p className="text-red-400 text-[10px] font-mono mt-1">
                        {clienteErrors.ci}
                      </p>
                    )}
                  </Field>
                  <Field label="Tipo de Cliente">
                    <select
                      className={inputCls}
                      value={cliente.tipo_cliente}
                      onChange={(e) =>
                        setCliente((c) => ({
                          ...c,
                          tipo_cliente: e.target
                            .value as ClienteForm["tipo_cliente"],
                        }))
                      }
                    >
                      <option value="NACIONAL">Nacional</option>
                      <option value="EXTRANJERO">Extranjero</option>
                      <option value="IMPORTADOR">Importador</option>
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Correo Electrónico">
                    <input
                      type="email"
                      className={inputCls}
                      placeholder="correo@ejemplo.com"
                      value={cliente.email}
                      onChange={(e) =>
                        setCliente((c) => ({ ...c, email: e.target.value }))
                      }
                    />
                    {clienteErrors.email && (
                      <p className="text-red-400 text-[10px] font-mono mt-1">
                        {clienteErrors.email}
                      </p>
                    )}
                  </Field>
                  <Field label="Teléfono Principal">
                    <div className="relative">
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="+1 (555) 000-0000"
                        value={cliente.telefono}
                        onChange={(e) =>
                          setCliente((c) => ({
                            ...c,
                            telefono: e.target.value,
                          }))
                        }
                      />
                      {cliente.telefono.length > 7 && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm">
                          ✓
                        </span>
                      )}
                    </div>
                    {clienteErrors.telefono && (
                      <p className="text-red-400 text-[10px] font-mono mt-1">
                        {clienteErrors.telefono}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              {/* Logística */}
              <div className="space-y-6 pt-6 border-t border-border/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary">
                    <Truck />
                  </span>
                  <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Preferencia Logística
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["SHOWROOM", "DOMICILIO"] as EntregaType[]).map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setEntrega(tipo)}
                      className={`group flex flex-col p-6 rounded-xl text-left transition-all duration-300 ${
                        entrega === tipo
                          ? "bg-muted ring-1 ring-primary/50"
                          : "bg-muted/50 border border-border/20 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`text-xl ${entrega === tipo ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`}
                        >
                          {tipo === "SHOWROOM" ? <HomeIcon /> : <Pin />}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${entrega === tipo ? "border-primary bg-primary" : "border-border group-hover:border-primary"}`}
                        >
                          {entrega === tipo && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="font-bold text-sm mb-1">
                        {tipo === "SHOWROOM" ? (
                          "Retiro en Showroom"
                        ) : (
                          <>
                            Entrega a Domicilio{" "}
                            <span className="text-primary font-mono text-[10px]">
                              +$2,100
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground/60">
                        {tipo === "SHOWROOM"
                          ? "Entrega con guante blanco gratuita en nuestra sede principal."
                          : "Transporte cerrado directo a tus coordenadas especificadas."}
                      </div>
                    </button>
                  ))}
                </div>
                <Field label="Dirección de Entrega / Residencia">
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="Calle, número, ciudad, provincia, país..."
                    value={cliente.direccion}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, direccion: e.target.value }))
                    }
                  />
                  {clienteErrors.direccion && (
                    <p className="text-red-400 text-[10px] font-mono mt-1">
                      {clienteErrors.direccion}
                    </p>
                  )}
                </Field>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="sm:w-auto px-6 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-accent transition-all text-sm"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => {
                    if (validateCliente()) setStep(3);
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-sm"
                >
                  <span>Continuar al Paso 3 — Pago</span>
                  <span>→</span>
                </button>
              </div>
            </section>
            <SummarySidebar />
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            PASO 3 — Revisión y Pago
        ══════════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <>
            {/* Columna izquierda: resumen del pedido */}
            <div className="lg:col-span-7 space-y-8">
              {/* Tarjeta resumen del pedido */}
              <section className="bg-muted rounded-xl p-8 border border-border/10 hover:-translate-y-1 transition-transform duration-300">
                <h2 className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-6 uppercase">
                  Resumen del Pedido
                </h2>
                <div className="space-y-6">
                  {/* Vehículo */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {vehicle?.marca} {vehicle?.modelo}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {ALL_COLORS[config.colorIndex].name} /{" "}
                        {INTERIORS[config.interiorIndex].name}
                      </p>
                    </div>
                    <div className="font-mono text-xl font-bold text-right shrink-0">
                      {basePrice > 0
                        ? formatCurrency(basePrice)
                        : "A consultar"}
                    </div>
                  </div>

                  {/* Opciones */}
                  <div className="pt-5 space-y-4 border-t border-border/15">
                    {[
                      {
                        icon: Circle,
                        label: `Color: ${ALL_COLORS[config.colorIndex].name}`,
                        price: ALL_COLORS[config.colorIndex].price,
                      },
                      {
                        icon: Wrench,
                        label: `Rines: ${WHEELS[config.wheelIndex].name}`,
                        price: WHEELS[config.wheelIndex].price,
                      },
                      {
                        icon: RockingChair,
                        label: `Interior: ${INTERIORS[config.interiorIndex].name}`,
                        price: INTERIORS[config.interiorIndex].price,
                      },
                      {
                        icon: entrega === "DOMICILIO" ? Truck : HomeIcon,
                        label:
                          entrega === "DOMICILIO"
                            ? "Entrega a Domicilio"
                            : "Retiro en Showroom",
                        price: logistica,
                        italic: true,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center"
                      >
                        <div
                          className={`flex items-center gap-3 text-sm ${item.italic ? "text-muted-foreground/70 italic" : ""}`}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {item.price === 0
                            ? "Incluido"
                            : `+${formatCurrency(item.price)}`}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total final */}
                  <div className="pt-5 bg-background/40 rounded-lg p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                          Monto Final a Pagar
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Impuestos y registro incluidos
                        </div>
                      </div>
                      <div className="text-3xl font-black text-primary tracking-tighter font-mono">
                        {basePrice > 0 ? formatCurrency(total) : "A consultar"}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Badges de confianza */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Badge>
                  <Lock />
                  <span>SSL Seguro</span>
                </Badge>
                <Badge>
                  <CheckCircle />
                  <span>Vendedor Verificado</span>
                </Badge>
                <Badge>
                  <Headphones />
                  <span>Soporte 24/7</span>
                </Badge>
                <Badge>
                  <Shield />
                  <span>Escrow Asegurado</span>
                </Badge>
              </div>

              {/* Imagen editorial */}
              <section className="relative h-64 overflow-hidden rounded-2xl group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx2AVDptmnlKyqO3cRE30k1tBBfIS6Jfw71zU1gjtilp4I-Kz6hmsOH7iGKEiG-Mz9rZxGbPSncNKb8PIX_MTOD7x32xAcXNF6Pwmvt3k_ML1ZoKJlNzZdgTE-C9EQj-3JpUPjR-ChGv_AFXrO3k-PE-HXPmX_t0PpgoQ2YNCu4GzXgMbFX31IMnH1XQRFZlwKjatKKnpADC_yEehd9gisu_lj9aH7IngqdGan5uNslQdeljBh9pawSwb8xkyLgogRSFZQRoJSAf0"
                  alt="Interior de lujo"
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 max-w-sm">
                  <div className="font-mono text-primary mb-2 tracking-[0.3em] text-xs uppercase">
                    Excelencia como Estándar
                  </div>
                  <h3 className="text-xl font-black text-foreground leading-tight">
                    Cada vehículo pasa una certificación técnica de 250 puntos
                    antes de llegar a tu colección.
                  </h3>
                </div>
              </section>
            </div>

            {/* Columna derecha: formulario de pago */}
            <div className="lg:col-span-5">
              <div className="bg-muted rounded-xl p-8 border border-border/10 shadow-2xl sticky top-24">
                <h2 className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-8 uppercase">
                  Método de Pago
                </h2>

                {/* Toggle Tarjeta / Transferencia */}
                <div className="flex gap-2 p-1 bg-background/50 rounded-lg mb-8">
                  {(["TARJETA", "TRANSFERENCIA"] as PagoForm["metodo"][]).map(
                    (m) => (
                      <button
                        key={m}
                        onClick={() => setPago((p) => ({ ...p, metodo: m }))}
                        className={`flex-1 py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          pago.metodo === m
                            ? "bg-muted text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>
                          {m === "TARJETA" ? <CreditCard /> : <Landmark />}
                        </span>
                        {m === "TARJETA" ? "Tarjeta" : "Transferencia"}
                      </button>
                    ),
                  )}
                </div>

                <div className="space-y-5">
                  {pago.metodo === "TARJETA" ? (
                    <>
                      <Field label="Nombre del Titular">
                        <input
                          type="text"
                          className={`${inputCls} uppercase font-mono tracking-wider`}
                          placeholder="ALEXANDER V. STERLING"
                          value={pago.titular}
                          onChange={(e) =>
                            setPago((p) => ({
                              ...p,
                              titular: e.target.value.toUpperCase(),
                            }))
                          }
                        />
                        {pagoErrors.titular && (
                          <p className="text-red-400 text-[10px] font-mono mt-1">
                            {pagoErrors.titular}
                          </p>
                        )}
                      </Field>

                      <Field label="Número de Tarjeta">
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`${inputCls} font-mono`}
                            placeholder="4444 8888 2222 0000"
                            value={pago.numero}
                            onChange={(e) =>
                              setPago((p) => ({
                                ...p,
                                numero: formatCardNumber(e.target.value),
                              }))
                            }
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {pago.numero.startsWith("4") && (
                              <span className="bg-muted px-2 py-1 rounded text-[8px] font-black italic text-foreground">
                                VISA
                              </span>
                            )}
                            {pago.numero.startsWith("5") && (
                              <span className="bg-red-600 px-2 py-1 rounded text-[8px] font-black text-white">
                                MC
                              </span>
                            )}
                          </div>
                        </div>
                        {pagoErrors.numero && (
                          <p className="text-red-400 text-[10px] font-mono mt-1">
                            {pagoErrors.numero}
                          </p>
                        )}
                      </Field>

                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Fecha de Vencimiento">
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`${inputCls} font-mono`}
                            placeholder="MM / YY"
                            value={pago.expiry}
                            onChange={(e) =>
                              setPago((p) => ({
                                ...p,
                                expiry: formatExpiry(e.target.value),
                              }))
                            }
                          />
                          {pagoErrors.expiry && (
                            <p className="text-red-400 text-[10px] font-mono mt-1">
                              {pagoErrors.expiry}
                            </p>
                          )}
                        </Field>
                        <Field label="CVV">
                          <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            className={`${inputCls} font-mono`}
                            placeholder="•••"
                            value={pago.cvv}
                            onChange={(e) =>
                              setPago((p) => ({
                                ...p,
                                cvv: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4),
                              }))
                            }
                          />
                          {pagoErrors.cvv && (
                            <p className="text-red-400 text-[10px] font-mono mt-1">
                              {pagoErrors.cvv}
                            </p>
                          )}
                        </Field>
                      </div>
                    </>
                  ) : (
                    <div className="bg-background/40 rounded-xl p-6 space-y-3 text-sm">
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                        Datos para Transferencia
                      </p>
                      {[
                        { label: "Banco", val: "Autocuba Bank" },
                        { label: "Cuenta", val: "0045-2310-88-0200012345" },
                        { label: "SWIFT", val: "ELBKUS33" },
                        { label: "Concepto", val: vehicle?.vin },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-muted-foreground font-mono text-xs uppercase">
                            {r.label}
                          </span>
                          <span className="font-mono font-bold text-xs">
                            {r.val}
                          </span>
                        </div>
                      ))}
                      <p className="text-muted-foreground/60 text-[10px] font-mono mt-4 leading-relaxed">
                        Una vez realizada la transferencia, envía el comprobante
                        a reservas@eliteimports.com. Tu pedido se confirmará en
                        24–48 h.
                      </p>
                    </div>
                  )}

                  {/* Términos */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="mt-1 rounded bg-background border-border text-primary focus:ring-primary"
                      checked={pago.terminos}
                      onChange={(e) =>
                        setPago((p) => ({ ...p, terminos: e.target.checked }))
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      Autorizo a Autocuba a procesar el monto indicado y acepto
                      el{" "}
                      <span className="text-primary underline underline-offset-2 cursor-pointer">
                        Acuerdo de Compra
                      </span>{" "}
                      y los{" "}
                      <span className="text-primary underline underline-offset-2 cursor-pointer">
                        Términos de Servicio
                      </span>
                      .
                    </label>
                  </div>
                  {pagoErrors.terminos && (
                    <p className="text-red-400 text-[10px] font-mono">
                      {pagoErrors.terminos}
                    </p>
                  )}

                  {/* Botones finales */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-black py-5 rounded-xl hover:shadow-[0_0_20px_rgba(var(--primary)/0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>Realizar Pedido →</>
                      )}
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full border border-border text-foreground font-medium py-3 rounded-xl hover:bg-accent transition-all text-sm"
                    >
                      ← Volver al Paso 2
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground/40 font-mono uppercase tracking-widest leading-relaxed">
                    Pago procesado mediante tecnología de bóveda cifrada
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
