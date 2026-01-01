"use client";

import { AddAddressForm } from "@/components/AddAddressForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { calculateSubtotal, formatCurrency } from "@/lib/helper";
import { useCart } from "@/store/use-cart";
import { CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCart();
  const [selectedId, setSelectedId] = useState(1);
  const [shippingCharges, setShippingCharges] = useState(1000);
  const [taxes, setTaxes] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const savedAddresses = [
    { id: 1, name: "Home", street: "123 Boogie Ave", city: "Tokyo", state: 'Tokyo Pradesh', phone: "999999999", pin: '171711' },
    { id: 2, name: "Work", street: "456 Neko St", city: "Kyoto", state: 'Kyoto Pradesh', phone: "9898989812", pin: '177005' },
    { id: 3, name: "Work", street: "NIT Mirpur", city: "Mirpur", state: 'Himachal Pradesh', phone: "1234554321", pin: '177005' },
  ];

  return (
    <ProtectedRoute>
      <main className="container mx-auto font-body mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-3">

          {/* left */}
          <div className="md:col-span-7">
            <div className="bg-white border shadow-sm rounded-sm px-3 py-5">
              <h1 className="font-heading text-2xl font-semibold mb-3">Address Details</h1>
              <div>
                <h1 className="px-1 py-2">Select Address</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
                  {savedAddresses.map((address, index) => (
                    <div
                      key={index}
                      className={`border cursor-pointer ${address.id === selectedId ? "border-primary bg-primary/5" : "border-gray-200"} text-sm p-3 rounded-sm relative`}
                      onClick={() => setSelectedId(address.id)}
                    >
                      {address.id === selectedId ? (<CheckCircle className="h-4 w-4 absolute right-5 text-green-600" />) : <></>}
                      <h1 className="font-semibold">{address.name}</h1>
                      <p>{address.street}, {address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.phone}</p>
                      <p>{address.pin}</p>
                    </div>
                  ))}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div
                      onClick={() => setIsDialogOpen(true)}
                      className="border border-dashed border-gray-300 text-gray-400 flex items-center justify-center text-sm font-medium rounded-sm cursor-pointer hover:border-gray-500 hover:text-gray-500 transition-all duration-200 ease-in-out"
                    >
                      + Add new address
                    </div>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Add Address
                        </DialogTitle>
                      </DialogHeader>
                      <button className="flex items-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 p-2 rounded-lg transition-colors w-full border border-dashed border-primary/30 justify-center">
                        <MapPin size={16} />
                        Use my current location
                      </button>
                      <AddAddressForm onSuccess={() => setIsDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="md:col-span-5">
            <div className="bg-white border shadow-sm rounded-sm px-3 py-5 sticky -top-10">
              <h1 className="font-heading text-2xl font-semibold mb-3">Order Summary</h1>
              <ScrollArea className="h-65">
                <div className="flex flex-col gap-1 md:gap-2 ">
                  {items.map((item, index) => (
                    <div key={index} className="w-[95%] h-20 flex items-center bg-primary/10 rounded-xs px-3 mx-auto">
                      <div className="h-full relative aspect-square">
                        <Image src={item.images.url || '/default-product-image.png'} fill alt={item.images.altText || item.title} />
                      </div>
                      <div className="mr-auto ml-5">
                        <h1 className="font-medium">{item.title}</h1>
                        <p className="text-xs font-medium text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(item.price * 100)}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mx-3 my-5 grid grid-cols-2 items-center text-sm gap-2">
                  <h3>Items ({items.reduce((acc, item) => acc + item.quantity, 0)}):</h3>
                  <h3 className="justify-self-end">{formatCurrency(calculateSubtotal(items))}</h3>
                  <h3>Shipping Charges:</h3>
                  <h3 className={`justify-self-end ${shippingCharges ? '' : 'text-green-700'}`}>{shippingCharges ? formatCurrency(shippingCharges) : 'Free'}</h3>
                  <h3>Estimated Tax:</h3>
                  <h3 className="justify-self-end">{formatCurrency(taxes)}</h3>

                  <h1 className="text-xl font-bold my-5">Grand Total:</h1>
                  <h1 className="justify-self-end text-xl font-bold my-5">{formatCurrency(calculateSubtotal(items) + shippingCharges + taxes)}</h1>
              </div>
              <Button className="w-3/4 mx-auto block cursor-pointer h-10 rounded-[8px]">Place Your Order</Button>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}