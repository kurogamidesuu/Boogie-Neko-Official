"use client";

import { AddAddressForm } from "@/components/AddAddressForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Address, changeDefault, fetchAddresses } from "@/lib/api";
import { calculateSubtotal, formatCurrency } from "@/lib/helper";
import { useCart } from "@/store/use-cart";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import { Activity, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const { items } = useCart();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectAddressMenu, setSelectAddressMenu] = useState(false);

  const shippingCharges = 1000;
  const taxes = 0;

  const currentAddress = useMemo(() => {
    return savedAddresses.find(addr => addr.id === selectedId);
  }, [savedAddresses, selectedId]);

  const loadAddresses = async () => {
    try {
      const data = await fetchAddresses();
      setSavedAddresses(data);

      if (data && data.length > 0 && selectedId == null) {
        const defaultAddr = data.find(a => a.isDefault);
        setSelectedId(defaultAddr?.id || data[0].id);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddressSaved = async () => {
    setIsDialogOpen(false);
    loadAddresses();
  }
  
  const handleChangeDefault = async (id: number) => {
    try {
      await changeDefault(id);
      await loadAddresses();
      setSelectAddressMenu(false);
      toast.success('Default address updated');
    } catch(e) {
      toast.error('Failed to update default');
    }
  }
  
  useEffect(() => {
    loadAddresses();
  }, []);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <ProtectedRoute>
      <main className="container mx-auto font-body mt-10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-3">

          {/* left */}
          <div className="md:col-span-7">
            <div className="bg-white border shadow-sm rounded-sm p-5">
              <h1 className="font-heading text-2xl font-semibold mb-3">Address Details</h1>
              <div>
              {!selectAddressMenu && (
                <div className='flex justify-between'>
                  <div className="flex gap-3 ">
                    {currentAddress
                    ? (
                      <div>
                        <h1 className="font-semibold">Delivering to:</h1>
                        <div className="text-sm mt-1">
                            <h1 className="font-semibold">{currentAddress.fullName} ({currentAddress.type})</h1>
                            <p>{currentAddress.houseNumber}, {currentAddress.area}</p>
                            <p>{currentAddress.city}, {currentAddress.state}</p>
                            {currentAddress.landmark
                              ? <p>{currentAddress.landmark}</p>
                              : <></>}
                            <p>{currentAddress.phone}</p>
                            <p>{currentAddress.pincode}</p>
                        </div>
                      </div>
                    )
                    : (
                      <div>
                        No address
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => setSelectAddressMenu(true)}
                    variant='link'
                    className="text-primary"
                  >
                    {savedAddresses.length > 0 ? "Change" : "Add address"}
                  </Button>
                </div>
              )}
                <Activity mode={selectAddressMenu || savedAddresses.length === 0 ? "visible" : "hidden"}>
                  <div className="bg-primary/5 p-5 my-5 rounded-sm">
                    <div className='flex justify-between pb-2'>
                      <h1 className="px-1 py-2">Select Delivery Address</h1>
                      {savedAddresses.length > 0 && (
                        <Button variant='outline' size='sm' onClick={() => setSelectAddressMenu(false)}>Select</Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 font-body">
                      {savedAddresses.map((address, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedId(address.id!)}
                          className={`border cursor-pointer transition-all ${
                            address.id === selectedId
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                          } text-sm p-3 rounded-sm relative group`}
                        >
                          {address.id === selectedId && (<CheckCircle className="h-4 w-4 absolute right-5 text-primary" />)}
                          {address.isDefault && (
                            <span className="absolute top-3 right-12 text-xs font-bold">
                              DEFAULT
                            </span>
                          )}
                          <h1 className="font-semibold">{address.fullName} ({address.type})</h1>
                          <p>{address.houseNumber}, {address.area}</p>
                          <p>{address.city}, {address.state}</p>
                          {address.landmark
                            ? <p>{address.landmark}</p>
                            : <></>}
                          <p>{address.phone}</p>
                          <p>{address.pincode}</p>
                          {!address.isDefault && (
                            <Button
                            variant='link'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeDefault(address.id!);
                              }}
                              className="text-xs hover:text-primary/80 px-0"
                            >
                              Set as Default
                            </Button>
                          )}
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
                          <AddAddressForm onSuccess={handleAddressSaved} setSelected={setSelectedId} />
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/* <Button
                      onClick={() => handleChangeDefault(selectedId)}
                      className="mt-5"
                    >
                      Set Default Address
                    </Button> */}
                  </div>
                </Activity>
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