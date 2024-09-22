/* eslint-disable no-undef */
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserContext } from "@/utils/UserContext";
import { Button } from "@/components/ui/button";
import { avatarLetter } from "@/utils/helper";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  street: z.string().min(1, { message: "Street is required." }),
  city: z.string().min(1, { message: "City is required." }),
  zipcode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, { message: "Invalid zipcode format." }),
});

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { toast } = useToast();
  const user = useMemo(
    () => users.find((u) => u.id === parseInt(id)),
    [users, id]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      street: "",
      city: "",
      zipcode: "",
    },
  });

  const { isDirty, dirtyFields } = form.formState;

  const onSubmit = (data) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data,
        address: {
          ...user.address,
          street: data.street,
          city: data.city,
          zipcode: data.zipcode,
        },
      };
      if (avatar) updatedUser.avatarImage = avatarPreview; // Add image in updated user
      updateUser(updatedUser);
      toast({
        description: "User data updated successfully",
      });
      navigate("/");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // low-quality bit64 image for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    toast({
      description: "Avatar removed successfully",
    });
  };

  const isChanged = useMemo(() => {
    if (!isDirty && !avatar) return false;
    const changedFields = Object.keys(dirtyFields);
    return (
      changedFields.some((field) => {
        if (field === "street" || field === "city" || field === "zipcode") {
          return form.getValues(field) !== user.address[field];
        }
        return form.getValues(field) !== user[field];
      }) || avatar !== null
    );
  }, [isDirty, dirtyFields, avatar, user, form]);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      });
    }
  }, [user, form]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Edit details</h2>
      <div className="flex flex-col gap-y-4">
        <div className="flex max-w-sm md:items-center md:flex-row flex-col gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview} alt="Avatar" />
              <AvatarFallback className="text-3xl">
                {user ? avatarLetter(user.name) : ""}
              </AvatarFallback>
            </Avatar>
            {avatarPreview && (
              <Button
                onClick={removeAvatar}
                variant="destructive"
                size="icon"
                className="absolute rounded-full h-6 w-6 -top-1 right-1"
              >
                <X />
              </Button>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            title=" "
            onChange={handleImageUpload}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={!isChanged}>
              Update User
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
