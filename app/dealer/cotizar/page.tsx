"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Car,
  Calculator,
  CreditCard,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",

    // Vehicle Preferences
    vehicleType: "",
    brand: "",
    maxPrice: [25000],
    financing: false,
    downPayment: [20],
    loanTerm: "60",

    // Additional Info
    tradeIn: false,
    tradeInDetails: "",
    additionalNotes: "",

    // Contact Preferences
    preferredContact: "",
    bestTimeToCall: "",
    urgency: "",
  });

  const [calculatedPayment, setCalculatedPayment] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const calculatePayment = () => {
    const price = formData.maxPrice[0];
    const downPaymentAmount = (price * formData.downPayment[0]) / 100;
    const loanAmount = price - downPaymentAmount;
    const monthlyRate = 0.08 / 12; // 8% annual rate
    const months = Number.parseInt(formData.loanTerm);

    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setCalculatedPayment(Math.round(payment));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      if (step === 2 && formData.financing) {
        calculatePayment();
      }
    } else {
      // Submit form
      console.log("Quote request submitted:", formData);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">
                ¡Cotización Enviada!
              </h1>
              <p className="text-xl text-muted-foreground font-serif">
                Hemos recibido tu solicitud de cotización. Nuestro equipo se
                pondrá en contacto contigo dentro de las próximas 2 horas.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-sans">
                  Resumen de tu Solicitud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground font-serif">
                      Nombre:
                    </span>
                    <p className="font-medium font-serif">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">
                      Email:
                    </span>
                    <p className="font-medium font-serif">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">
                      Tipo de vehículo:
                    </span>
                    <p className="font-medium font-serif">
                      {formData.vehicleType}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">
                      Presupuesto máximo:
                    </span>
                    <p className="font-medium font-serif">
                      ${formData.maxPrice[0].toLocaleString()}
                    </p>
                  </div>
                  {formData.financing && (
                    <>
                      <div>
                        <span className="text-muted-foreground font-serif">
                          Enganche:
                        </span>
                        <p className="font-medium font-serif">
                          {formData.downPayment[0]}%
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-serif">
                          Pago mensual estimado:
                        </span>
                        <p className="font-medium text-accent font-serif">
                          ${calculatedPayment}/mes
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inventario">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Ver Inventario
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-accent" />
              <h1 className="text-2xl font-bold text-foreground font-sans">
                AutoCuba
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-foreground hover:text-accent transition-colors font-serif"
              >
                Inicio
              </Link>
              <Link
                href="/inventario"
                className="text-foreground hover:text-accent transition-colors font-serif"
              >
                Inventario
              </Link>
              <Link href="/cotizar" className="text-accent font-serif">
                Cotizar
              </Link>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Contactar
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">
              Solicitar Cotización
            </h1>
            <p className="text-xl text-muted-foreground font-serif">
              Completa el formulario y recibe una cotización personalizada en
              minutos
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-sans">
                      {step === 1 && "Información Personal"}
                      {step === 2 && "Preferencias de Vehículo"}
                      {step === 3 && "Opciones de Financiamiento"}
                      {step === 4 && "Información Adicional"}
                    </CardTitle>
                    <CardDescription className="font-serif">
                      {step === 1 &&
                        "Cuéntanos sobre ti para personalizar tu cotización"}
                      {step === 2 && "¿Qué tipo de vehículo estás buscando?"}
                      {step === 3 && "Configuremos las opciones de pago"}
                      {step === 4 &&
                        "Últimos detalles para completar tu solicitud"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="font-serif">
                            Nombre
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="font-serif">
                            Apellidos
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Tus apellidos"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="font-serif">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="tu@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="font-serif">
                            Teléfono
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+53 5555-5555"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="font-serif">
                            Dirección
                          </Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            placeholder="Tu dirección completa"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="font-serif">
                            Ciudad
                          </Label>
                          <Select
                            value={formData.city}
                            onValueChange={(value) =>
                              setFormData({ ...formData, city: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu ciudad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="havana">La Habana</SelectItem>
                              <SelectItem value="santiago">
                                Santiago de Cuba
                              </SelectItem>
                              <SelectItem value="camaguey">Camagüey</SelectItem>
                              <SelectItem value="holguin">Holguín</SelectItem>
                              <SelectItem value="santa-clara">
                                Santa Clara
                              </SelectItem>
                              <SelectItem value="other">Otra</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Vehicle Preferences */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="font-serif">Tipo de vehículo</Label>
                          <Select
                            value={formData.vehicleType}
                            onValueChange={(value) =>
                              setFormData({ ...formData, vehicleType: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="¿Qué tipo de vehículo buscas?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedan">Sedán</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="pickup">Camioneta</SelectItem>
                              <SelectItem value="compact">Compacto</SelectItem>
                              <SelectItem value="any">Cualquiera</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="font-serif">
                            Marca preferida (opcional)
                          </Label>
                          <Select
                            value={formData.brand}
                            onValueChange={(value) =>
                              setFormData({ ...formData, brand: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="¿Tienes alguna marca preferida?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="toyota">Toyota</SelectItem>
                              <SelectItem value="honda">Honda</SelectItem>
                              <SelectItem value="ford">Ford</SelectItem>
                              <SelectItem value="chevrolet">
                                Chevrolet
                              </SelectItem>
                              <SelectItem value="nissan">Nissan</SelectItem>
                              <SelectItem value="hyundai">Hyundai</SelectItem>
                              <SelectItem value="any">
                                Sin preferencia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="font-serif">
                            Presupuesto máximo: $
                            {formData.maxPrice[0].toLocaleString()}
                          </Label>
                          <Slider
                            value={formData.maxPrice}
                            onValueChange={(value) =>
                              setFormData({ ...formData, maxPrice: value })
                            }
                            max={50000}
                            min={10000}
                            step={1000}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1 font-serif">
                            <span>$10,000</span>
                            <span>$50,000</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="financing"
                            checked={formData.financing}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                financing: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="financing" className="font-serif">
                            Estoy interesado en opciones de financiamiento
                          </Label>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Financing Options */}
                    {step === 3 && (
                      <div className="space-y-6">
                        {formData.financing ? (
                          <>
                            <div>
                              <Label className="font-serif">
                                Enganche: {formData.downPayment[0]}% ($
                                {Math.round(
                                  (formData.maxPrice[0] *
                                    formData.downPayment[0]) /
                                    100
                                ).toLocaleString()}
                                )
                              </Label>
                              <Slider
                                value={formData.downPayment}
                                onValueChange={(value) =>
                                  setFormData({
                                    ...formData,
                                    downPayment: value,
                                  })
                                }
                                max={50}
                                min={10}
                                step={5}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-1 font-serif">
                                <span>10%</span>
                                <span>50%</span>
                              </div>
                            </div>

                            <div>
                              <Label className="font-serif">
                                Plazo del préstamo
                              </Label>
                              <Select
                                value={formData.loanTerm}
                                onValueChange={(value) =>
                                  setFormData({ ...formData, loanTerm: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="36">
                                    36 meses (3 años)
                                  </SelectItem>
                                  <SelectItem value="48">
                                    48 meses (4 años)
                                  </SelectItem>
                                  <SelectItem value="60">
                                    60 meses (5 años)
                                  </SelectItem>
                                  <SelectItem value="72">
                                    72 meses (6 años)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {calculatedPayment > 0 && (
                              <div className="bg-accent/10 p-4 rounded-lg">
                                <h4 className="font-semibold text-accent mb-2 font-sans">
                                  Pago Mensual Estimado
                                </h4>
                                <div className="text-3xl font-bold text-accent font-sans">
                                  ${calculatedPayment}/mes
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 font-serif">
                                  *Estimación basada en tasa de interés del 8%
                                  anual. El pago final puede variar según tu
                                  historial crediticio.
                                </p>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="tradeIn"
                                checked={formData.tradeIn}
                                onCheckedChange={(checked) =>
                                  setFormData({
                                    ...formData,
                                    tradeIn: checked as boolean,
                                  })
                                }
                              />
                              <Label htmlFor="tradeIn" className="font-serif">
                                Tengo un vehículo para intercambio
                              </Label>
                            </div>

                            {formData.tradeIn && (
                              <div>
                                <Label
                                  htmlFor="tradeInDetails"
                                  className="font-serif"
                                >
                                  Detalles del vehículo a intercambiar
                                </Label>
                                <Textarea
                                  id="tradeInDetails"
                                  value={formData.tradeInDetails}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      tradeInDetails: e.target.value,
                                    })
                                  }
                                  placeholder="Marca, modelo, año, kilometraje, condición..."
                                  rows={3}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2 font-sans">
                              Pago de Contado
                            </h3>
                            <p className="text-muted-foreground font-serif">
                              Has seleccionado pagar de contado. Esto puede
                              darte acceso a mejores precios y promociones
                              especiales.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 4: Additional Information */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <Label
                            htmlFor="additionalNotes"
                            className="font-serif"
                          >
                            Notas adicionales (opcional)
                          </Label>
                          <Textarea
                            id="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                additionalNotes: e.target.value,
                              })
                            }
                            placeholder="Cuéntanos cualquier detalle específico sobre lo que buscas..."
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label className="font-serif">
                            ¿Cómo prefieres que te contactemos?
                          </Label>
                          <Select
                            value={formData.preferredContact}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                preferredContact: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu preferencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phone">Teléfono</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="both">Ambos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="font-serif">
                            Mejor horario para contactarte
                          </Label>
                          <Select
                            value={formData.bestTimeToCall}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                bestTimeToCall: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="¿Cuándo es mejor llamarte?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">
                                Mañana (8AM - 12PM)
                              </SelectItem>
                              <SelectItem value="afternoon">
                                Tarde (12PM - 6PM)
                              </SelectItem>
                              <SelectItem value="evening">
                                Noche (6PM - 9PM)
                              </SelectItem>
                              <SelectItem value="anytime">
                                Cualquier momento
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="font-serif">
                            ¿Qué tan urgente es tu compra?
                          </Label>
                          <Select
                            value={formData.urgency}
                            onValueChange={(value) =>
                              setFormData({ ...formData, urgency: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu urgencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Inmediata (esta semana)
                              </SelectItem>
                              <SelectItem value="soon">
                                Pronto (este mes)
                              </SelectItem>
                              <SelectItem value="planning">
                                Planificando (próximos 3 meses)
                              </SelectItem>
                              <SelectItem value="researching">
                                Solo investigando
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 1}
                      >
                        Anterior
                      </Button>
                      <Button
                        type="submit"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {step === 4 ? "Enviar Cotización" : "Siguiente"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Summary Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-sans">
                      <Calculator className="h-5 w-5" />
                      Resumen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.firstName && (
                      <div>
                        <span className="text-sm text-muted-foreground font-serif">
                          Cliente:
                        </span>
                        <p className="font-medium font-serif">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                    )}

                    {formData.vehicleType && (
                      <div>
                        <span className="text-sm text-muted-foreground font-serif">
                          Tipo de vehículo:
                        </span>
                        <p className="font-medium font-serif">
                          {formData.vehicleType}
                        </p>
                      </div>
                    )}

                    {formData.maxPrice[0] > 10000 && (
                      <div>
                        <span className="text-sm text-muted-foreground font-serif">
                          Presupuesto:
                        </span>
                        <p className="font-medium font-serif">
                          ${formData.maxPrice[0].toLocaleString()}
                        </p>
                      </div>
                    )}

                    {formData.financing && calculatedPayment > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground font-serif">
                          Pago mensual:
                        </span>
                        <p className="font-medium text-accent font-serif">
                          ${calculatedPayment}/mes
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-sans">
                      <Phone className="h-5 w-5" />
                      ¿Necesitas Ayuda?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground font-serif">
                      Nuestros expertos están disponibles para ayudarte con tu
                      cotización.
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full gap-2 bg-transparent"
                      >
                        <Phone className="h-4 w-4" />
                        +53 5555-5555
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 bg-transparent"
                      >
                        <Mail className="h-4 w-4" />
                        info@autocuba.com
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-sans">
                      ¿Por qué AutoCuba?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 font-serif">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Respuesta en 2 horas
                      </li>
                      <li className="flex items-center gap-2 font-serif">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Mejores precios garantizados
                      </li>
                      <li className="flex items-center gap-2 font-serif">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Financiamiento flexible
                      </li>
                      <li className="flex items-center gap-2 font-serif">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Garantía incluida
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
