import { z } from 'zod';

// Definir los enums basados en tu base de datos
export const EstadoSolicitudImportacion = z.enum([
    'PENDIENTE',
    'CONFIRMADA',
    'EN_TRANSITO',
    'EN_ADUANA',
    'ENTREGADA',
    'CANCELADA'
]);

export const ImportacionClienteSchema = z.object({
    name: z.string().min(1, 'El ID del cliente es requerido'),
    nameAuto: z.string(),
    email: z.string().email(("El correo es requerido")),
    tel: z.string().min(11, "El número es requerido"),
    model: z.string().min(1, "El modelo es requerido"),
    costo_importacion: z.coerce.number()
        .min(0, 'El costo de importación no puede ser negativo')
        .max(1000000, 'El costo de importación no puede exceder 1,000,000'),
    request: z.string().optional(),
    condition: z.string(),
    year: z.string().optional(),
    apellidos: z.string().min(2, "El apellido es requerido"),
    ci: z.string().min(1, "El ci es rquerido").max(11, "El ci no puede excederse de 11 digitos"),
    direccion: z.string()

});

