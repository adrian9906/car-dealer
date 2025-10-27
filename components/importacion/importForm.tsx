"use client";

import {
  Award,
  Calculator,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  Shield,
  Ship,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { z } from "zod";
import { ImportacionClienteSchema } from "@/lib/import";
import { useForm } from "react-hook-form";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Vehicle } from "@/app/dealer/inventario/page";
import { CardResultsCar } from "./cardResults";
import { HeaderImport } from "./headerSection";
import { Footermport } from "./importFooter";
import { CreateClientImport } from "@/lib/actions/actions";

interface VehicleFormProps extends React.HTMLAttributes<HTMLDivElement> {
  autos: Vehicle[];
}
export interface PriceExport {
  vehiclePrice: number;
  shipping: number;
  customs: number;
  documentation: number;
  total: number;
}
type FormData = z.infer<typeof ImportacionClienteSchema>;

export function ImportCarForm({
  className,
  autos,
  ...props
}: VehicleFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(ImportacionClienteSchema),
    defaultValues: {
      costo_importacion: 0,
      name: "",
      nameAuto: "",
      condition: "",
      email: "",
      tel: "",
      request: "",
      year: "",
      model: "",
    },
  });

  const [step, setStep] = useState(1);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  const [showResults, setShowResults] = useState(false);

  const [estimatedCosts, setEstimatedCosts] = useState({
    vehiclePrice: 0,
    shipping: 0,
    customs: 0,
    documentation: 0,
    total: 0,
  });
  const autoID = form.watch("nameAuto");

  const model = form.watch("model");

  useEffect(() => {
    if (selectedVehicle) {
      form.setValue("model", selectedVehicle.modelo);
    }
  }, [selectedVehicle, form]);

  const getStepFields = (currentStep: number): (keyof FormData)[] => {
    switch (currentStep) {
      case 1:
        return ["nameAuto", "model", "year", "costo_importacion", "condition"];
      case 2:
        return [
          "name",
          "email",
          "tel",
          "request",
          "nameAuto",
          "condition",
          "costo_importacion",
        ];
      default:
        return [];
    }
  };

  const calculateImportCosts = (basePrice: number) => {
    const vehiclePrice = basePrice || selectedVehicle?.precio_venta || 0;
    const shipping = 2500; // Fixed shipping cost
    const customs = vehiclePrice * 0.15; // 15% customs
    const documentation = 800; // Documentation fees
    const total = vehiclePrice + shipping + customs + documentation;

    setEstimatedCosts({
      vehiclePrice,
      shipping,
      customs,
      documentation,
      total,
    });
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    calculateImportCosts(vehicle?.precio_venta || 0);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      console.log(step);
      if (step <= 3) {
        console.log("entra aqui");
        const result = await CreateClientImport(data, estimatedCosts);
        if (result) setShowResults(true);
      } else {
        // Submit form
        console.log("Error al crear la importación:", data);
        setShowResults(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleNext = async () => {
    const fields = getStepFields(step);
    const isValid = await form.trigger(fields);

    if (isValid) {
      setStep(step + 1);
    } else {
      console.log("Errores de validación:", form.formState.errors);
    }
  };
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  console.log(model);
  return (
    <div>
      {showResults && selectedVehicle ? (
        <CardResultsCar
          selectedVehicle={selectedVehicle}
          estimatedCosts={estimatedCosts}
        />
      ) : (
        <>
          <HeaderImport />

          {/* Import Request Form */}
          <section className="py-10">
            <div className="container w-full  mx-auto px-4">
              <div className="max-w-full h-full mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">
                    Solicitar Importación
                  </h2>
                  <p className="text-xl text-muted-foreground font-serif">
                    Completa el formulario y recibe una cotización personalizada
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {[1, 2].map((stepNumber) => (
                      <div key={stepNumber} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            step >= stepNumber
                              ? "bg-primary text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {stepNumber}
                        </div>
                        {stepNumber < 3 && (
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Form */}
                      <div className="lg:col-span-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="font-sans">
                              {step === 1 && "Detalles del Vehículo"}
                              {step === 2 && "Información Personal"}
                            </CardTitle>
                            <CardDescription className="font-serif">
                              {step === 1 &&
                                "Especifica qué vehículo quieres importar"}
                              {step === 2 &&
                                "Necesitamos tus datos para procesar la solicitud"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Step 1: Vehicle Details */}
                            {step === 1 && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <div>
                                      <FormField
                                        control={form.control}
                                        name="nameAuto"
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormLabel>Marca</FormLabel>
                                              <FormControl>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Selecciona una marca" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    {autos.map((auto) => (
                                                      <SelectItem
                                                        value={auto.marca}
                                                        key={auto.id_auto}
                                                        className="hover:bg-primary dark:hover:bg-primary"
                                                        onClick={() =>
                                                          setSelectedVehicle(
                                                            auto
                                                          )
                                                        }
                                                      >
                                                        {auto.marca}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <FormField
                                      control={form.control}
                                      name="model"
                                      render={({ field }) => {
                                        return (
                                          <FormItem>
                                            <FormLabel>Modelo</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Ej: Corolla, Civic, F-150"
                                                type="text"
                                                {...field}
                                                value={
                                                  selectedVehicle?.modelo || ""
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  </div>
                                </div>

                                {autoID &&
                                  autos.filter(
                                    (auto) => auto.marca === autoID
                                  ) && (
                                    <div>
                                      <Label className="font-serif mb-4 block">
                                        Modelos Disponibles para Importación
                                      </Label>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {autos
                                          .filter(
                                            (auto) => auto.marca === autoID
                                          )
                                          .map((vehicle, index) => (
                                            <Card
                                              key={index}
                                              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                                                selectedVehicle?.modelo ===
                                                vehicle.modelo
                                                  ? "ring-2 ring-accent border-accent"
                                                  : "hover:border-accent/50"
                                              }`}
                                              onClick={() =>
                                                handleVehicleSelect(vehicle)
                                              }
                                            >
                                              <CardContent className="p-4">
                                                <img
                                                  src={
                                                    vehicle.imagen ||
                                                    "/placeholder.svg"
                                                  }
                                                  alt={`${vehicle.marca} ${vehicle.modelo}`}
                                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                                />
                                                <div className="text-center">
                                                  <h4 className="font-semibold font-sans">
                                                    {autoID
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      autoID.slice(1)}{" "}
                                                    {vehicle.modelo}
                                                  </h4>
                                                  <p className="text-sm text-muted-foreground font-serif">
                                                    {vehicle.año}
                                                  </p>
                                                  <p className="text-primary font-semibold font-serif">
                                                    Desde $
                                                    {vehicle.precio_venta?.toLocaleString()}
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
                                    <div>
                                      <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormLabel>
                                                Año (opcional)
                                              </FormLabel>
                                              <FormControl>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Selecciona un año" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    {autos
                                                      .filter(
                                                        (auto) =>
                                                          auto.marca === autoID
                                                      )
                                                      .map((auto) => (
                                                        <SelectItem
                                                          value={auto.año.toLocaleString()}
                                                          key={auto.id_auto}
                                                          className="hover:bg-primary dark:hover:bg-primary"
                                                        >
                                                          {auto.año}
                                                        </SelectItem>
                                                      ))}
                                                  </SelectContent>
                                                </Select>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <FormField
                                      control={form.control}
                                      name="costo_importacion"
                                      render={({ field }) => {
                                        return (
                                          <FormItem>
                                            <FormLabel>
                                              Costo base del auto (USD)
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="25000"
                                                type="number"
                                                {...field}
                                                value={
                                                  selectedVehicle?.precio_venta ||
                                                  0
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <FormField
                                    control={form.control}
                                    name="condition"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>Condición</FormLabel>
                                          <FormControl>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Selecciona la condición del carro" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem
                                                  className="hover:bg-primary dark:hover:bg-primary"
                                                  value="new"
                                                >
                                                  Nuevo
                                                </SelectItem>
                                                <SelectItem
                                                  className="hover:bg-primary dark:hover:bg-primary"
                                                  value="excellent"
                                                >
                                                  Excelente
                                                </SelectItem>
                                                <SelectItem
                                                  className="hover:bg-primary dark:hover:bg-primary"
                                                  value="good"
                                                >
                                                  Bueno
                                                </SelectItem>
                                                <SelectItem
                                                  className="hover:bg-primary dark:hover:bg-primary"
                                                  value="fair"
                                                >
                                                  Regular
                                                </SelectItem>
                                                <SelectItem
                                                  className="hover:bg-primary dark:hover:bg-primary"
                                                  value="any"
                                                >
                                                  Cualquiera
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Step 2: Personal Information */}
                            {step === 2 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>Nombre</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ej Juan ..."
                                              type="text"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="apellidos"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>Apellidos</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ej Garcia ..."
                                              type="text"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>Correo</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ej example@gmail.com"
                                              type="email"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="tel"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>Teléfono</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ej +1 233 232 233 ..."
                                              type="tel"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="ci"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <FormLabel>
                                            Carnet de indentidad
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ej 89121241809 ..."
                                              type="text"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                  <div>
                                    <FormField
                                      control={form.control}
                                      name="direccion"
                                      render={({ field }) => {
                                        return (
                                          <FormItem>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Ej calle 3 #45 e/ 3 y 6, Perla, La Habana  ..."
                                                type="text"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <FormField
                                      control={form.control}
                                      name="request"
                                      render={({ field }) => {
                                        return (
                                          <FormItem>
                                            <FormLabel>
                                              Peticiones de Importación
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Ej El auto que quiero importar es muy caro, necesito una cobertura adicional"
                                                type="text"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  </div>
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
                                className="hover:bg-primary dark:hover:bg-primary"
                              >
                                Anterior
                              </Button>
                              {step < 3 ? (
                                <Button
                                  type="button" // ← NO es submit hasta el final
                                  onClick={handleNext}
                                  className="bg-primary hover:bg-primary/80 text-accent-foreground"
                                >
                                  Siguiente
                                </Button>
                              ) : (
                                <Button
                                  type="submit" // ← SOLO el último step es submit
                                  className="bg-primary hover:bg-primary/80 text-accent-foreground"
                                >
                                  Enviar Solicitud
                                </Button>
                              )}
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
                              <Calculator className="h-5 w-5 text-primary" />
                              Resumen
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {selectedVehicle && (
                              <div className="text-center">
                                <img
                                  src={
                                    selectedVehicle.imagen || "/placeholder.svg"
                                  }
                                  alt={`${selectedVehicle.marca} ${selectedVehicle.modelo}`}
                                  className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                              </div>
                            )}

                            {selectedVehicle?.marca &&
                              selectedVehicle.modelo && (
                                <div>
                                  <span className="text-sm text-muted-foreground font-serif">
                                    Vehículo:
                                  </span>
                                  <p className="font-medium font-serif">
                                    {selectedVehicle.marca}{" "}
                                    {selectedVehicle.modelo}{" "}
                                    {selectedVehicle.año}
                                  </p>
                                </div>
                              )}

                            {selectedVehicle?.precio_venta && (
                              <div>
                                <span className="text-sm text-muted-foreground font-serif">
                                  Presupuesto:
                                </span>
                                <p className="font-medium font-serif">
                                  ${" "}
                                  {selectedVehicle?.precio_venta.toLocaleString()}
                                </p>
                              </div>
                            )}

                            {estimatedCosts.total > 0 && (
                              <div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                  <h4 className="font-semibold font-sans">
                                    Costos Estimados:
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between font-serif">
                                      <span>Vehículo:</span>
                                      <span>
                                        $
                                        {estimatedCosts.vehiclePrice.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between font-serif">
                                      <span>Envío:</span>
                                      <span>
                                        $
                                        {estimatedCosts.shipping.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between font-serif">
                                      <span>Aduana:</span>
                                      <span>
                                        $
                                        {estimatedCosts.customs.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between font-serif">
                                      <span>Documentación:</span>
                                      <span>
                                        $
                                        {estimatedCosts.documentation.toLocaleString()}
                                      </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-primary font-serif">
                                      <span>Total:</span>
                                      <span>
                                        ${estimatedCosts.total.toLocaleString()}
                                      </span>
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
                              <Phone className="h-5 w-5 text-primary" />
                              ¿Necesitas Ayuda?
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground font-serif">
                              Nuestros especialistas en importación están
                              disponibles para ayudarte.
                            </p>
                            <div className="space-y-2">
                              <Button
                                variant="ghost"
                                className="w-full gap-2 hover:bg-primary/60 dark:hover:bg-primary/60 hover:text-black dark:hover:text-white"
                              >
                                <Phone className="h-4 w-4 text-primary" />
                                +53 5555-5555
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full gap-2 hover:bg-primary/60 dark:hover:bg-primary/60 hover:text-black dark:hover:text-white"
                              >
                                <Mail className="h-4 w-4 text-primary" />
                                importacion@autocuba.com
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Import Benefits */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="font-sans">
                              Ventajas de Importar
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2 font-serif">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Mayor variedad de modelos
                              </li>
                              <li className="flex items-center gap-2 font-serif">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Precios más competitivos
                              </li>
                              <li className="flex items-center gap-2 font-serif">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Vehículos más recientes
                              </li>
                              <li className="flex items-center gap-2 font-serif">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Historial verificado
                              </li>
                              <li className="flex items-center gap-2 font-serif">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Garantía de importación
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
          <section className="py-20 px-4 sm:px-10 md:px-20 lg:px-40">
            <Footermport />
          </section>
        </>
      )}
    </div>
  );
}
