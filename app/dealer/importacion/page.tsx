"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Car, Ship, Shield, CheckCircle, Phone, Mail, Calculator, Globe, Users, Award } from "lucide-react"
import Link from "next/link"

const availableVehicles = {
  toyota: [
    { model: "Corolla", year: "2023", image: "/toyota-corolla-blanco.png", basePrice: 22000 },
    { model: "Camry", year: "2023", image: "/toyota-camry-2023.png", basePrice: 28000 },
    { model: "RAV4", year: "2023", image: "/toyota-rav4-2023.png", basePrice: 32000 },
    { model: "Highlander", year: "2023", image: "/toyota-highlander-2023.png", basePrice: 38000 },
  ],
  honda: [
    { model: "Civic", year: "2023", image: "/placeholder-h6b4p.png", basePrice: 24000 },
    { model: "CR-V", year: "2023", image: "/honda-crv-negro-suv.png", basePrice: 30000 },
    { model: "Accord", year: "2023", image: "/honda-accord-2023.png", basePrice: 27000 },
    { model: "Pilot", year: "2023", image: "/honda-pilot-2023.png", basePrice: 36000 },
  ],
  ford: [
    { model: "F-150", year: "2023", image: "/ford-f150-azul.png", basePrice: 35000 },
    { model: "Mustang", year: "2023", image: "/ford-mustang-2023.png", basePrice: 32000 },
    { model: "Explorer", year: "2023", image: "/ford-explorer-2023.png", basePrice: 34000 },
    { model: "Escape", year: "2023", image: "/ford-escape-2023.png", basePrice: 26000 },
  ],
  chevrolet: [
    { model: "Silverado", year: "2023", image: "/chevrolet-silverado-2023.png", basePrice: 36000 },
    { model: "Tahoe", year: "2023", image: "/chevrolet-tahoe-gris.png", basePrice: 52000 },
    { model: "Equinox", year: "2023", image: "/chevrolet-equinox-2023.png", basePrice: 28000 },
    { model: "Malibu", year: "2023", image: "/chevrolet-malibu-2023.png", basePrice: 25000 },
  ],
  nissan: [
    { model: "Sentra", year: "2023", image: "/nissan-sentra-rojo-sedan.png", basePrice: 20000 },
    { model: "Altima", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 26000 },
    { model: "Rogue", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 29000 },
    { model: "Pathfinder", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 35000 },
  ],
  hyundai: [
    { model: "Elantra", year: "2023", image: "/hyundai-elantra-plata-compacto.png", basePrice: 21000 },
    { model: "Sonata", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 25000 },
    { model: "Tucson", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 27000 },
    { model: "Santa Fe", year: "2023", image: "/placeholder.svg?height=200&width=300", basePrice: 33000 },
  ],
}

export default function ImportPage() {
  const [step, setStep] = useState(1)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [formData, setFormData] = useState({
    // Vehicle Details
    brand: "",
    model: "",
    year: "",
    maxPrice: "",
    condition: "",

    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Import Preferences
    urgency: "",
    financing: false,
    additionalRequests: "",

    // Contact Preferences
    preferredContact: "",
    bestTimeToCall: "",
  })

  const [estimatedCosts, setEstimatedCosts] = useState({
    vehiclePrice: 0,
    shipping: 0,
    customs: 0,
    documentation: 0,
    total: 0,
  })

  const [showResults, setShowResults] = useState(false)

  const calculateImportCosts = (basePrice = null) => {
    const vehiclePrice = basePrice || Number.parseInt(formData.maxPrice) || 0
    const shipping = 2500 // Fixed shipping cost
    const customs = vehiclePrice * 0.15 // 15% customs
    const documentation = 800 // Documentation fees
    const total = vehiclePrice + shipping + customs + documentation

    setEstimatedCosts({
      vehiclePrice,
      shipping,
      customs,
      documentation,
      total,
    })
  }

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle)
    setFormData({
      ...formData,
      model: vehicle.model,
      year: vehicle.year,
      maxPrice: vehicle.basePrice.toString(),
    })
    calculateImportCosts(vehicle.basePrice)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      if (step === 1 && formData.maxPrice) {
        calculateImportCosts()
      }
    } else {
      // Submit form
      console.log("Import request submitted:", formData)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Car className="h-8 w-8 text-accent" />
                <h1 className="text-2xl font-bold text-foreground font-sans">AutoCuba</h1>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-foreground hover:text-accent transition-colors font-serif">
                  Inicio
                </Link>
                <Link href="/inventario" className="text-foreground hover:text-accent transition-colors font-serif">
                  Inventario
                </Link>
                <Link href="/importacion" className="text-accent font-serif">
                  Importación
                </Link>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Contactar</Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">¡Solicitud de Importación Enviada!</h1>
              <p className="text-xl text-muted-foreground font-serif">
                Hemos recibido tu solicitud de importación. Nuestro equipo especializado se pondrá en contacto contigo
                dentro de las próximas 24 horas para comenzar el proceso.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-sans">Resumen de tu Solicitud</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedVehicle && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={selectedVehicle.image || "/placeholder.svg"}
                      alt={`${formData.brand} ${formData.model}`}
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground font-serif">Vehículo:</span>
                    <p className="font-medium font-serif">
                      {formData.brand} {formData.model} {formData.year}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">Presupuesto:</span>
                    <p className="font-medium font-serif">${Number.parseInt(formData.maxPrice).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">Costo total estimado:</span>
                    <p className="font-medium text-accent font-serif">${estimatedCosts.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-serif">Tiempo estimado:</span>
                    <p className="font-medium font-serif">4-6 semanas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inventario">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Ver Inventario Local</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-accent" />
              <h1 className="text-2xl font-bold text-foreground font-sans">AutoCuba</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-accent transition-colors font-serif">
                Inicio
              </Link>
              <Link href="/inventario" className="text-foreground hover:text-accent transition-colors font-serif">
                Inventario
              </Link>
              <Link href="/importacion" className="text-accent font-serif">
                Importación
              </Link>
              <Link href="/cotizar" className="text-foreground hover:text-accent transition-colors font-serif">
                Cotizar
              </Link>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Contactar</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <Ship className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-sans">Importación desde USA</h1>
            <p className="text-xl text-muted-foreground mb-8 font-serif leading-relaxed">
              Accede a miles de vehículos en Estados Unidos. Nosotros nos encargamos de todo el proceso de importación
              para que recibas tu auto en Cuba sin complicaciones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 font-sans">2000+</div>
                <div className="text-muted-foreground font-serif">Vehículos Importados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 font-sans">4-6</div>
                <div className="text-muted-foreground font-serif">Semanas de Entrega</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 font-sans">100%</div>
                <div className="text-muted-foreground font-serif">Gestión Completa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">¿Por qué Importar con AutoCuba?</h2>
            <p className="text-xl text-muted-foreground font-serif">
              Somos expertos en importación de vehículos con más de 15 años de experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Acceso Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Acceso a miles de vehículos en subastas y dealers de Estados Unidos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Garantía Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Garantía completa en el proceso y inspección detallada antes del envío
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Equipo Experto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Especialistas en importación que manejan todos los trámites legales
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Mejor Precio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Precios competitivos y transparentes sin costos ocultos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Proceso de Importación</h2>
            <p className="text-xl text-muted-foreground font-serif">
              Un proceso simple y transparente de principio a fin
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Solicitud</h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Completas el formulario con tus preferencias de vehículo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">1-2 días</div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Búsqueda</h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Localizamos el vehículo perfecto en nuestras fuentes en USA
                </p>
                <div className="text-xs text-accent mt-2 font-serif">3-7 días</div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Compra y Envío</h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Compramos el vehículo y gestionamos el envío marítimo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">2-3 semanas</div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Entrega</h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Gestionamos la aduana y te entregamos tu vehículo listo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">1-2 semanas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Import Request Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Solicitar Importación</h2>
              <p className="text-xl text-muted-foreground font-serif">
                Completa el formulario y recibe una cotización personalizada
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-accent" : "bg-muted"}`} />
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
                        {step === 1 && "Detalles del Vehículo"}
                        {step === 2 && "Información Personal"}
                        {step === 3 && "Preferencias de Importación"}
                      </CardTitle>
                      <CardDescription className="font-serif">
                        {step === 1 && "Especifica qué vehículo quieres importar"}
                        {step === 2 && "Necesitamos tus datos para procesar la solicitud"}
                        {step === 3 && "Últimos detalles para personalizar tu importación"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Step 1: Vehicle Details */}
                      {step === 1 && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="brand" className="font-serif">
                                Marca
                              </Label>
                              <Select
                                value={formData.brand}
                                onValueChange={(value) => {
                                  setFormData({ ...formData, brand: value, model: "", year: "" })
                                  setSelectedVehicle(null)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona la marca" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="toyota">Toyota</SelectItem>
                                  <SelectItem value="honda">Honda</SelectItem>
                                  <SelectItem value="ford">Ford</SelectItem>
                                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                                  <SelectItem value="nissan">Nissan</SelectItem>
                                  <SelectItem value="hyundai">Hyundai</SelectItem>
                                  <SelectItem value="bmw">BMW</SelectItem>
                                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                                  <SelectItem value="audi">Audi</SelectItem>
                                  <SelectItem value="other">Otra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="model" className="font-serif">
                                Modelo
                              </Label>
                              <Input
                                id="model"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                placeholder="Ej: Corolla, Civic, F-150"
                                required
                              />
                            </div>
                          </div>

                          {formData.brand && availableVehicles[formData.brand] && (
                            <div>
                              <Label className="font-serif mb-4 block">Modelos Disponibles para Importación</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availableVehicles[formData.brand].map((vehicle, index) => (
                                  <Card
                                    key={index}
                                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                                      selectedVehicle?.model === vehicle.model
                                        ? "ring-2 ring-accent border-accent"
                                        : "hover:border-accent/50"
                                    }`}
                                    onClick={() => handleVehicleSelect(vehicle)}
                                  >
                                    <CardContent className="p-4">
                                      <img
                                        src={vehicle.image || "/placeholder.svg"}
                                        alt={`${formData.brand} ${vehicle.model}`}
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                      />
                                      <div className="text-center">
                                        <h4 className="font-semibold font-sans">
                                          {formData.brand.charAt(0).toUpperCase() + formData.brand.slice(1)}{" "}
                                          {vehicle.model}
                                        </h4>
                                        <p className="text-sm text-muted-foreground font-serif">{vehicle.year}</p>
                                        <p className="text-accent font-semibold font-serif">
                                          Desde ${vehicle.basePrice.toLocaleString()}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="year" className="font-serif">
                                Año (opcional)
                              </Label>
                              <Select
                                value={formData.year}
                                onValueChange={(value) => setFormData({ ...formData, year: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Año preferido" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2024">2024</SelectItem>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2021">2021</SelectItem>
                                  <SelectItem value="2020">2020</SelectItem>
                                  <SelectItem value="2019">2019</SelectItem>
                                  <SelectItem value="2018">2018</SelectItem>
                                  <SelectItem value="older">2017 o anterior</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="maxPrice" className="font-serif">
                                Presupuesto máximo (USD)
                              </Label>
                              <Input
                                id="maxPrice"
                                type="number"
                                value={formData.maxPrice}
                                onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                                placeholder="25000"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="font-serif">Condición preferida</Label>
                            <Select
                              value={formData.condition}
                              onValueChange={(value) => setFormData({ ...formData, condition: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="¿Qué condición prefieres?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Nuevo</SelectItem>
                                <SelectItem value="excellent">Excelente</SelectItem>
                                <SelectItem value="good">Bueno</SelectItem>
                                <SelectItem value="fair">Regular</SelectItem>
                                <SelectItem value="any">Cualquiera</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Personal Information */}
                      {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="font-serif">
                              Nombre
                            </Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+53 5555-5555"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Import Preferences */}
                      {step === 3 && (
                        <div className="space-y-6">
                          <div>
                            <Label className="font-serif">¿Qué tan urgente es tu importación?</Label>
                            <Select
                              value={formData.urgency}
                              onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu urgencia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediate">Inmediata (proceso express)</SelectItem>
                                <SelectItem value="normal">Normal (4-6 semanas)</SelectItem>
                                <SelectItem value="flexible">Flexible (cuando encuentres el mejor precio)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="financing"
                              checked={formData.financing}
                              onCheckedChange={(checked) => setFormData({ ...formData, financing: checked as boolean })}
                            />
                            <Label htmlFor="financing" className="font-serif">
                              Estoy interesado en opciones de financiamiento
                            </Label>
                          </div>

                          <div>
                            <Label htmlFor="additionalRequests" className="font-serif">
                              Solicitudes adicionales (opcional)
                            </Label>
                            <Textarea
                              id="additionalRequests"
                              value={formData.additionalRequests}
                              onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
                              placeholder="Características específicas, color preferido, equipamiento especial..."
                              rows={4}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="font-serif">¿Cómo prefieres que te contactemos?</Label>
                              <Select
                                value={formData.preferredContact}
                                onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Método preferido" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="phone">Teléfono</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="both">Ambos</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="font-serif">Mejor horario para contactarte</Label>
                              <Select
                                value={formData.bestTimeToCall}
                                onValueChange={(value) => setFormData({ ...formData, bestTimeToCall: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Horario preferido" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="morning">Mañana (8AM - 12PM)</SelectItem>
                                  <SelectItem value="afternoon">Tarde (12PM - 6PM)</SelectItem>
                                  <SelectItem value="evening">Noche (6PM - 9PM)</SelectItem>
                                  <SelectItem value="anytime">Cualquier momento</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex justify-between pt-6">
                        <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1}>
                          Anterior
                        </Button>
                        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          {step === 3 ? "Enviar Solicitud" : "Siguiente"}
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
                      {selectedVehicle && (
                        <div className="text-center">
                          <img
                            src={selectedVehicle.image || "/placeholder.svg"}
                            alt={`${formData.brand} ${formData.model}`}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                        </div>
                      )}

                      {formData.brand && formData.model && (
                        <div>
                          <span className="text-sm text-muted-foreground font-serif">Vehículo:</span>
                          <p className="font-medium font-serif">
                            {formData.brand} {formData.model} {formData.year}
                          </p>
                        </div>
                      )}

                      {formData.maxPrice && (
                        <div>
                          <span className="text-sm text-muted-foreground font-serif">Presupuesto:</span>
                          <p className="font-medium font-serif">
                            ${Number.parseInt(formData.maxPrice).toLocaleString()}
                          </p>
                        </div>
                      )}

                      {estimatedCosts.total > 0 && (
                        <div>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <h4 className="font-semibold font-sans">Costos Estimados:</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between font-serif">
                                <span>Vehículo:</span>
                                <span>${estimatedCosts.vehiclePrice.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-serif">
                                <span>Envío:</span>
                                <span>${estimatedCosts.shipping.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-serif">
                                <span>Aduana:</span>
                                <span>${estimatedCosts.customs.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-serif">
                                <span>Documentación:</span>
                                <span>${estimatedCosts.documentation.toLocaleString()}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-bold text-accent font-serif">
                                <span>Total:</span>
                                <span>${estimatedCosts.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
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
                        Nuestros especialistas en importación están disponibles para ayudarte.
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                          <Phone className="h-4 w-4" />
                          +53 5555-5555
                        </Button>
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                          <Mail className="h-4 w-4" />
                          importacion@autocuba.com
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Import Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Ventajas de Importar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2 font-serif">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Mayor variedad de modelos
                        </li>
                        <li className="flex items-center gap-2 font-serif">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Precios más competitivos
                        </li>
                        <li className="flex items-center gap-2 font-serif">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Vehículos más recientes
                        </li>
                        <li className="flex items-center gap-2 font-serif">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Historial verificado
                        </li>
                        <li className="flex items-center gap-2 font-serif">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Garantía de importación
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
