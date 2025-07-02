import MenuItems from "./components/MenuItems"
import OrderContents from "./components/OrderContents"
import OrederTotals from "./components/OrederTotals"
import TipPerecentajeForm from "./components/TipPerecentajeForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {

  const { oreder, tip, setTip, addItem, removeItem, placeOrder } = useOrder()

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>
      <main className="max-w-7xl  mx-auto mt-20 grid md:grid-cols-2">
        <div className="p-2">
          <h2 className=" text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">


            {menuItems.map(item => (
              <MenuItems key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>

        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {oreder.length > 0 ? (
            <>
              <OrderContents
                order={oreder}
                removeItem={removeItem}
              />
              <TipPerecentajeForm
                setTip={setTip}
                tip={tip}
              />
              <OrederTotals
                order={oreder}
                tip={tip}
                placeOrder={placeOrder}
              />

            </>

          ) : <p className="text-center">La orden esta vacía</p>}

        </div>

      </main>
    </>
  )
}

export default App
