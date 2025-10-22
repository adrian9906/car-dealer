'use server'

import { PrismaClient } from '@prisma/client'
import { db } from '../db'
import { PageParams } from '@/app/dealer/inventario/page'

export async function getBrands() {
    try {
        const brands = await db.auto.findMany({
            select: {
                marca: true,
            },
            orderBy: {
                marca: 'asc',
            },
        })
        return brands.map((brand) => brand.marca)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getModelos() {
    try {
        const models = await db.auto.findMany({
            select: {
                modelo: true,
            },
            orderBy: {
                modelo: 'asc',
            },
        })
        return models.map((model) => model.modelo)
    } catch (error) {
        console.error(error)
        return []
    }
}


export async function getVehicle(id: string) {
    const vehicle = db.auto.findFirst({
        where: {
            id_auto: id
        },
        select: {
            año: true,
            id_auto: true,
            vin: true,
            category: true,
            color: true,
            estado_auto: true,
            features: true,
            imagen: true,
            kilometraje: true,
            marca: true,
            modelo: true,
            precio_venta: true,
            stock: true,
            tipo_combustible: true,
            transmision: true,
            tipo_propiedad: true,
            fecha_llegada_cuba: true,

        }
    })
    return vehicle

}

export async function getVehicles(searchParams: PageParams['searchParams']) {
    const where: any = {};
    if (searchParams.marca && searchParams.marca !== 'all') {
        where.marca = searchParams.marca;
    }

    if (searchParams.modelo && searchParams.modelo !== 'all') {
        where.modelo = {
            contains: searchParams.modelo,


        };
    }

    if (searchParams.año && searchParams.año !== 'all') {
        where.año = parseInt(searchParams.año);
    }

    if (searchParams.color && searchParams.color !== 'all') {
        where.color = {
            contains: searchParams.color,

        };
    }

    if (searchParams.tipo_combustible && searchParams.tipo_combustible !== 'all') {
        where.tipo_combustible = searchParams.tipo_combustible;
    }

    if (searchParams.stock && searchParams.stock !== 'all') {
        where.stock = searchParams.stock;
    }

    if (searchParams.category && searchParams.category !== 'all') {
        where.category = searchParams.category;
    }

    if (searchParams.price_min || searchParams.price_max) {
        where.precio_venta = {};
        if (searchParams.price_min) {
            where.precio_venta.gte = parseFloat(searchParams.price_min);
        }
        if (searchParams.price_max) {
            where.precio_venta.lte = parseFloat(searchParams.price_max);
        }
    }

    if (searchParams.location && searchParams.location !== 'all') {
        where.ubicacion = searchParams.location;
    }

    if (searchParams.brand && searchParams.brand !== 'all') {
        const brandsArray = searchParams.brand.split(',');
        where.marca = {
            in: brandsArray,
        };
    }

    const page = parseInt(searchParams.page || '1');
    const rowsPerPage = parseInt(searchParams.rows || '50');
    const skip = (page - 1) * rowsPerPage;

    let orderBy: any = {};
    switch (searchParams.sort) {
        case 'precio_asc':
            orderBy = { precio_venta: 'asc' };
            break;
        case 'precio_desc':
            orderBy = { precio_venta: 'desc' };
            break;
        case 'año_desc':
            orderBy = { año: 'desc' };
            break;
        case 'kilometraje_asc':
            orderBy = { kilometraje: 'asc' };
            break;
        case 'fecha_llegada_cuba':
            orderBy = { fecha_llegada_cuba: 'desc' };
            break;
        default:
            orderBy = { fecha_llegada_cuba: 'desc' };
            break;
    }

    try {
        const vehicles = await db.auto.findMany({
            where,
            select: {
                id_auto: true,
                marca: true,
                modelo: true,
                año: true,
                precio_venta: true,
                stock: true,
                category: true,
                imagen: true,
                kilometraje: true,
                estado_auto: true,
                color: true,
                tipo_combustible: true,
                transmision: true,
                features: true,
                vin: true,
                tipo_propiedad: true,
            },
            orderBy,
            skip: skip,
            take: rowsPerPage,
        });

        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles from Prisma:', error);
        return [];
    }
}

export async function getVehiclesTotal() {
    try {
        const vehicles = await db.auto.count();
        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles from Prisma:', error);
        return 0;
    }
}


