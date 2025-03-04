
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
}

export default function ShoppingCartPage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Thermomètre digital",
      price: 19.99,
      quantity: 1,
      image_url: null
    },
    {
      id: "2",
      name: "Boîte de masques (50)",
      price: 24.99,
      quantity: 2,
      image_url: null
    }
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Votre Panier</h1>
            <p className="text-muted-foreground mt-2">
              {cartItems.length} article(s) dans votre panier
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/shop" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continuer vos achats
            </Link>
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">Votre panier est vide</p>
              <p className="text-muted-foreground mb-6">Ajoutez des produits depuis notre boutique</p>
              <Button asChild>
                <Link to="/shop">Explorer la boutique</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Articles dans votre panier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 py-3">
                        <div className="bg-muted rounded w-16 h-16 flex-shrink-0 flex items-center justify-center">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="max-h-full max-w-full p-1" />
                          ) : (
                            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} € par unité</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <div className="h-8 px-4 flex items-center justify-center border-y">
                                {item.quantity}
                              </div>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      <span>{shipping.toFixed(2)} €</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Procéder au paiement
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
