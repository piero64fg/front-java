import Card from "../components/Card";
const Menu = () => {
  return (
    <div className="grid">
  <Card
    title="Productos"
    description="Gestiona productos"
    image="https://static.vecteezy.com/system/resources/thumbnails/019/637/527/small_2x/grocery-store-or-supermarket-with-food-product-shelves-racks-dairy-fruits-and-drinks-for-shopping-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg"
    route="/productos"
  />
  <Card
    title="Categorías"
    description="Clasificación de productos"
    image="https://static.vecteezy.com/system/resources/previews/013/011/122/non_2x/grocery-store-or-supermarket-with-food-product-shelves-racks-dairy-fruits-and-drinks-for-shopping-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg"
    route="/categorias"
  />
   <Card
    title="Ventas"
    description="Clasificación de productos"
    image="https://img.freepik.com/vecteurs-premium/comptable-verifie-factures-son-bureau_701961-1334.jpg?w=2000"
    route="/categorias"
  />
  <Card
    title="Historial"
    description="Clasificación de productos"
    image="https://tse2.mm.bing.net/th/id/OIP.HKHKj_TYM4NFyK9e1KYuRAHaFL?w=2000&h=1400&rs=1&pid=ImgDetMain&o=7&rm=3"
    route="/categorias"
  />
  <Card
    title="Usuarios"
    description="Clasificación de productos"
    image="https://ecompile.io/assets/img/blogs/profile-pictures/profile-picture-thumb.jpg"
    route="/categorias"
  />
</div>
  );
};

export default Menu;
