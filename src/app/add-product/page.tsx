import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

// define function addProduct to be server action and passed in form's action attribute.
async function addProduct(formData: FormData) {
    "use server"; // server action, we are inserting new product into database 

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price")) || 0  

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing fields")
    }

    await prisma.product.create({
        data:{
            name, description, imageUrl, price
        },
    });

    redirect("/");
}

export default function addProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          className="mb-3 w-full input input-bordered"
          name="name"
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
          required
        ></textarea>
        <input
          className="mb-3 w-full input input-bordered"
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          required
        />
        <input
          className="mb-3 w-full input input-bordered"
          name="price"
          placeholder="Price"
          type="number"
          required
        />
        <FormSubmitButton className="btn btn-primary btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
