"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Ship,
  Fuel,
  Calendar,
  Settings,
  Gauge,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Calculator,
  FileText,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data for vehicles (same as inventory)
const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 18500,
    category: "sedan",
    location: "local",
    mileage: 45000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Blanco",
    image: "/toyota-corolla-blanco.png",
    features: ["A/C", "Radio", "Airbags", "ABS"],
    // Extended details for vehicle page
    description:
      "Toyota Corolla 2020 en excelente estado. Vehículo confiable y económico, perfecto para uso diario en la ciudad. Mantenimiento al día y documentos en regla.",
    engine: "1.8L 4 cilindros",
    doors: 4,
    seats: 5,
    drivetrain: "Tracción delantera",
    exteriorColor: "Blanco Perla",
    interiorColor: "Gris",
    vin: "2T1BURHE5LC123456",
    condition: "Excelente",
    warranty: "6 meses",
    financing: true,
    images: [
      "/toyota-corolla-blanco.png",
      "/toyota-corolla-interior.png",
      "/toyota-corolla-engine.png",
      "/toyota-corolla-trunk.png",
    ],
    specifications: {
      Motor: "1.8L 4 cilindros",
      Potencia: "139 HP",
      Torque: "173 Nm",
      Consumo: "6.5L/100km",
      Tanque: "50 litros",
      "Velocidad máxima": "180 km/h",
      "0-100 km/h": "10.2 segundos",
    },
    safety: [
      "Airbags frontales",
      "Airbags laterales",
      "ABS",
      "Control de estabilidad",
      "Frenos de disco",
      "Cinturones de seguridad",
    ],
    comfort: ["Aire acondicionado", "Radio AM/FM", "Bluetooth", "USB", "Dirección asistida", "Vidrios eléctricos"],
  },
  {
    id: 2,
    brand: "Honda",
    model: "CR-V",
    year: 2019,
    price: 24000,
    category: "suv",
    location: "import",
    mileage: 38000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Negro",
    image: "/honda-crv-negro-suv.png",
    features: ["A/C", "GPS", "Cámara trasera", "Bluetooth"],
    description:
      "Honda CR-V 2019 importado desde USA. SUV versátil y espacioso, ideal para familias. Equipado con las últimas tecnologías de seguridad y confort.",
    engine: "2.4L 4 cilindros",
    doors: 5,
    seats: 5,
    drivetrain: "Tracción integral AWD",
    exteriorColor: "Negro Cristal",
    interiorColor: "Beige",
    vin: "2HKRM4H75KH123456",
    condition: "Muy bueno",
    warranty: "12 meses",
    financing: true,
    images: [
      "/honda-crv-negro-suv.png",
      "/placeholder-uojse.png",
      "/placeholder-vhm9k.png",
      "/honda-crv-dashboard.png",
    ],
    specifications: {
      Motor: "2.4L 4 cilindros",
      Potencia: "184 HP",
      Torque: "244 Nm",
      Consumo: "8.2L/100km",
      Tanque: "58 litros",
      "Velocidad máxima": "190 km/h",
      "0-100 km/h": "9.4 segundos",
    },
    safety: [
      "Honda Sensing",
      "Airbags múltiples",
      "ABS con EBD",
      "Control de tracción",
      "Cámara trasera",
      "Sensores de estacionamiento",
    ],
    comfort: [
      "Aire acondicionado dual",
      "Sistema de navegación GPS",
      "Bluetooth",
      "Cámara trasera",
      "Asientos de cuero",
      "Techo solar",
    ],
  },
]

interface VehicleDetailPageProps {
  params: {
    id: string
  }
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("specs")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-reveal]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const vehicle = vehicles.find((v) => v.id === Number.parseInt(params.id))

  if (!vehicle) {
    notFound()
  }

  const relatedVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.category === vehicle.category || v.brand === vehicle.brand))
    .slice(0, 3)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
    setShowContactForm(false)
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showImageModal) {
        if (e.key === "ArrowLeft") prevImage()
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "Escape") setShowImageModal(false)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showImageModal])

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
              <Link href="/importacion" className="text-foreground hover:text-accent transition-colors font-serif">
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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground font-serif">
          <Link href="/" className="hover:text-accent transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/inventario" className="hover:text-accent transition-colors">
            Inventario
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/inventario">
            <Button variant="outline" className="gap-2 bg-transparent hover:bg-accent/10 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Volver al Inventario
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden" data-reveal id="gallery">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={vehicle.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setShowImageModal(true)}
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={vehicle.location === "local" ? "default" : "secondary"}
                      className="bg-background/90 backdrop-blur"
                    >
                      {vehicle.location === "local" ? (
                        <>
                          <MapPin className="h-3 w-3 mr-1" />
                          Stock Local
                        </>
                      ) : (
                        <>
                          <Ship className="h-3 w-3 mr-1" />
                          Importación USA
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-background/90 hover:bg-background backdrop-blur transition-colors"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-background/90 hover:bg-background backdrop-blur transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur rounded-full px-3 py-1 text-sm font-serif">
                    {selectedImageIndex + 1} / {vehicle.images.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index
                            ? "border-accent scale-105"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Vista ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Description */}
            <Card data-reveal id="description">
              <CardHeader>
                <CardTitle className="font-sans">Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif leading-relaxed">{vehicle.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent font-sans">{vehicle.year}</div>
                    <div className="text-sm text-muted-foreground font-serif">Año</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent font-sans">
                      {(vehicle.mileage / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground font-serif">Kilómetros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent font-sans">{vehicle.doors}</div>
                    <div className="text-sm text-muted-foreground font-serif">Puertas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent font-sans">{vehicle.seats}</div>
                    <div className="text-sm text-muted-foreground font-serif">Asientos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-reveal id="details">
              <CardHeader>
                <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "specs"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Especificaciones
                  </button>
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "features"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Características
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === "history"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Historial
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vehicle.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-border last:border-b-0">
                        <span className="font-medium font-serif">{key}:</span>
                        <span className="text-muted-foreground font-serif">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Safety Features */}
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold mb-4 font-sans">
                        <Shield className="h-5 w-5 text-accent" />
                        Seguridad
                      </h4>
                      <ul className="space-y-2">
                        {vehicle.safety.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 font-serif">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Comfort Features */}
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold mb-4 font-sans">
                        <Star className="h-5 w-5 text-accent" />
                        Comodidad
                      </h4>
                      <ul className="space-y-2">
                        {vehicle.comfort.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 font-serif">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 font-sans">Información del Vehículo</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between font-serif">
                            <span className="text-muted-foreground">VIN:</span>
                            <span className="font-mono">{vehicle.vin}</span>
                          </div>
                          <div className="flex justify-between font-serif">
                            <span className="text-muted-foreground">Color exterior:</span>
                            <span>{vehicle.exteriorColor}</span>
                          </div>
                          <div className="flex justify-between font-serif">
                            <span className="text-muted-foreground">Color interior:</span>
                            <span>{vehicle.interiorColor}</span>
                          </div>
                          <div className="flex justify-between font-serif">
                            <span className="text-muted-foreground">Tracción:</span>
                            <span>{vehicle.drivetrain}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 font-sans">Mantenimiento</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-serif">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Último servicio: Hace 2 meses
                          </div>
                          <div className="flex items-center gap-2 text-sm font-serif">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Cambio de aceite al día
                          </div>
                          <div className="flex items-center gap-2 text-sm font-serif">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Inspección técnica vigente
                          </div>
                          <div className="flex items-center gap-2 text-sm font-serif">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Sin accidentes reportados
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Vehicle Info and Contact */}
          <div className="space-y-6">
            {/* Vehicle Summary */}
            <Card className="sticky top-24" data-reveal id="summary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-sans">
                      {vehicle.brand} {vehicle.model}
                    </CardTitle>
                    <CardDescription className="text-lg font-serif">
                      {vehicle.year} • {vehicle.color}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent font-sans">${vehicle.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground font-serif">Precio final</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm font-serif">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-serif">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-serif">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-serif">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.engine}</span>
                  </div>
                </div>

                <Separator />

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex justify-between font-serif">
                    <span className="text-muted-foreground">Condición:</span>
                    <Badge variant="secondary">{vehicle.condition}</Badge>
                  </div>
                  <div className="flex justify-between font-serif">
                    <span className="text-muted-foreground">Garantía:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Shield className="h-4 w-4 text-accent" />
                      {vehicle.warranty}
                    </span>
                  </div>
                  <div className="flex justify-between font-serif">
                    <span className="text-muted-foreground">Financiamiento:</span>
                    <span className="font-medium flex items-center gap-1">
                      {vehicle.financing ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Disponible
                        </>
                      ) : (
                        "No disponible"
                      )}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar Vendedor
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-2 bg-transparent hover:bg-accent/10 transition-colors">
                      <Phone className="h-4 w-4" />
                      Llamar
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent hover:bg-accent/10 transition-colors">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>

                {vehicle.financing && (
                  <div className="bg-muted/50 p-4 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4 text-accent" />
                      <h4 className="font-semibold font-sans">Financiamiento Disponible</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-serif">
                        <span className="text-muted-foreground">Enganche (20%):</span>
                        <span className="font-medium">${(vehicle.price * 0.2).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-serif">
                        <span className="text-muted-foreground">Desde:</span>
                        <span className="font-medium text-accent">
                          ${Math.round((vehicle.price * 0.8) / 60).toLocaleString()}/mes
                        </span>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-accent font-serif mt-2">
                      Ver opciones completas
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                    <FileText className="h-3 w-3" />
                    Cotizar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                    <Clock className="h-3 w-3" />
                    Agendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <div className="mt-16" data-reveal id="related">
            <div
              className={`transition-all duration-1000 ${
                isVisible.related ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-3xl font-bold text-foreground mb-8 font-sans">Vehículos Similares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVehicles.map((relatedVehicle) => (
                  <Card
                    key={relatedVehicle.id}
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border hover:border-accent/50"
                  >
                    <div className="relative">
                      <img
                        src={relatedVehicle.image || "/placeholder.svg"}
                        alt={`${relatedVehicle.brand} ${relatedVehicle.model}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={relatedVehicle.location === "local" ? "default" : "secondary"}
                          className="bg-background/90 backdrop-blur"
                        >
                          {relatedVehicle.location === "local" ? (
                            <>
                              <MapPin className="h-3 w-3 mr-1" />
                              Stock Local
                            </>
                          ) : (
                            <>
                              <Ship className="h-3 w-3 mr-1" />
                              Importación
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-sans text-lg">
                            {relatedVehicle.brand} {relatedVehicle.model}
                          </CardTitle>
                          <CardDescription className="font-serif">
                            {relatedVehicle.year} • {relatedVehicle.color}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-accent font-sans">
                            ${relatedVehicle.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Link href={`/vehiculo/${relatedVehicle.id}`}>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors">
                          Ver Detalles
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={vehicle.images[selectedImageIndex] || "/placeholder.svg"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur rounded-full px-4 py-2 text-sm font-serif">
              {selectedImageIndex + 1} / {vehicle.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-sans">Contactar Vendedor</CardTitle>
              <CardDescription className="font-serif">
                Envía un mensaje sobre este {vehicle.brand} {vehicle.model}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block font-serif">Nombre</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-serif">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-serif">Teléfono</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+53 5555-5555"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-serif">Mensaje</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Estoy interesado en este vehículo..."
                    rows={3}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                    Enviar Mensaje
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
