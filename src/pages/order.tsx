import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Coffee, Order } from "../lib/models";
import Loading from "../components/loading";
import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function OrderPage() {
  const { data: orders, error: ordersError } = useSWR<Order[]>("/orders");
  const { data: coffees, error: coffeesError } = useSWR<Coffee[]>("/coffee");

  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">Order</h1>
        <h2>รายการเครื่องออเดอร์ทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between pb-16">
          <h1 className="text-3xl font-semibold">รายการออเดอร์ทั้งหมด</h1>
        </div>

        {!orders && !ordersError && <Loading />}
        {!coffees && !coffeesError && <Loading />}

        {(ordersError || coffeesError) && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {ordersError?.message || coffeesError?.message}
          </Alert>
        )}
        {orders?.length === 0 && coffees?.length === 0 && <p className="text-center">No orders or coffees available</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders?.map((order) => {
            const coffee = coffees?.find(coffee => coffee.id === order.coffee_id);
            return (
              <div key={order.id} className="border border-solid border-neutral-200 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://placehold.co/400x300?text=${encodeURIComponent(coffee?.name || 'Coffee')}`}
                  alt={`Order ${coffee?.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{coffee?.name}</h2>
                 <p className="italic text-neutral-500 mb-4">
  Order Date: {new Date(order.order_date).toLocaleString()}
</p>
                  <p className="text-neutral-500 mb-4">{order.notes}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">{order.total_price} Baht</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
