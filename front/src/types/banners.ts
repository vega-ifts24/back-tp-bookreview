export interface BannerI {
  id: number // ID del banner
  title: string // Título del banner
  imageLink: string | null // Enlace de la imagen, puede ser null si no hay imagen
  section: string // Sección a la que pertenece el banner
}
