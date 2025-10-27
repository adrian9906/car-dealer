import { Star } from "lucide-react";

export function Footermport() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-light dark:text-text-dark">
          Lo que dicen nuestros clientes
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <img
              className="aspect-square rounded-full size-12 object-cover"
              data-alt="Portrait of Juan Pérez"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa0jJxNUhi-2sr36JR9RW1INlYNEN8hQQOQiN9b1cwINt0DmQvM4FVTBQOlmSWREQK6q-cc7YizYLFFQt7bJpW5wSWLD7_ok4fIuKdZMk7YJsEwmaPGqYLrFal-2Nlyd0k8L7cBdZjfSEL_waEjjbYhamJFJzEriDtnesxvoSfeK3Q9gxV-FzwTEFxtJKXTiMPtvVjgykOrugd85fLz7N4Dc3b6NR0rPrwFQNqvvYs-OL9Fl21DR_hvvDzYF8iqG4wzv_lss_-gg-V"
            />
            <div className="flex-1">
              <p className="text-text-light dark:text-text-dark text-primary font-bold font-display">
                Juan Pérez
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-body">
                Hace 2 meses
              </p>
            </div>
          </div>
          <div className="flex gap-0.5 text-primary">
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-body">
            "El proceso fue increíblemente fácil y transparente. ¡Mi auto llegó
            en perfectas condiciones y antes de lo esperado!"
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <img
              className="aspect-square rounded-full size-12 object-cover"
              data-alt="Portrait of Ana García"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUHxuu5aftldO_MDdaln18IofOW_RlUsWGYdOamk9mP5Yha2IlWsGrReZ1YBhii11aDX6L9M0ivIAvYt94pdUiaiCk5yq0pzS9G_3yQoNxWdds1CO8wGG4Lpwh5zAPPukiihujnDGadE4YMzaphveGLWTpY_dadfongUjDb0tFzxa0LrP6KTAocF6olwu1mf1tNzy6s3duAEAv_jSOnZQZY8mdLK9luEXv7UW5THC3mbjlR2ZjG82eFnJQF6O-gfY068sRL-V12HE5"
            />
            <div className="flex-1">
              <p className="text-text-light dark:text-text-dark text-primary font-bold font-display">
                Ana García
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-body">
                Hace 1 mes
              </p>
            </div>
          </div>
          <div className="flex gap-0.5 text-primary">
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-body">
            "Un servicio de primera. La atención al detalle y la comunicación
            constante hicieron toda la diferencia."
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <img
              className="aspect-square rounded-full size-12 object-cover"
              data-alt="Portrait of Carlos Rodríguez"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPmElnbtsRS43ToPrA_tv-yKnWvyq4JRCt8ZXkxT6n_93z0vLCqrjas8jRqK6MhIQC6vKW7WzTkfvYAmjNkj0PiFir4liJ3X6ZfJwDvAbeX81w5lawqCkn8sE2jOmjVNISkkZkhs9yQubnhSuhujMH9aKJqAJNxbPgCCIfUvQV0w8UIGBEH7FceLCG13P6JBqj_GQYHTXRhVWLbJQYOjzZxQPc8r_WUy7sQMvWvO7FXjs8F72Do-PY9yVfgYhxGqyiQGS8EhoS3m96"
            />
            <div className="flex-1">
              <p className="text-text-light dark:text-text-dark text-primary font-bold font-display">
                Carlos Rodríguez
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-body">
                Hace 3 semanas
              </p>
            </div>
          </div>
          <div className="flex gap-0.5 text-primary">
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>

            <span className="material-symbols-outlined text-xl">
              <Star className="fill-primary" />
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-body">
            "Superaron mis expectativas. Definitivamente los recomiendo para
            cualquiera que busque importar un vehículo de lujo."
          </p>
        </div>
      </div>
    </div>
  );
}
