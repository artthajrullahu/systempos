import { useState } from 'react';

const menu = [
  { id: 1, category: 'Kafe', name: 'Espresso', price: 1.5 },
  { id: 2, category: 'Kafe', name: 'Kapuçino', price: 2.0 },
  { id: 3, category: 'Kafe', name: 'Latte', price: 2.5 },
  { id: 4, category: 'Pije', name: 'Ujë', price: 1.0 },
  { id: 5, category: 'Pije', name: 'Coca Cola', price: 1.5 },
  { id: 6, category: 'Pije', name: 'Lëng Portokalli', price: 2.0 },
  { id: 7, category: 'Ushqim', name: 'Sanduiç', price: 3.0 },
  { id: 8, category: 'Ushqim', name: 'Kek', price: 2.0 },
];

const categories = ['Kafe', 'Pije', 'Ushqim'];

export default function OrderPanel({ table, onClose, onPay }) {
  const [order, setOrder] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Kafe');

  const addItem = (product) => {
    setOrder(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setOrder(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing.qty === 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const total = order.reduce((sum, i) => sum + i.price * i.qty, 0);
  const filtered = menu.filter(p => p.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[800px] h-[550px] flex overflow-hidden">
        
        {/* E majta — Porosia */}
        <div className="w-1/2 p-6 flex flex-col border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tavolina {table.id}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {order.length === 0 ? (
              <p className="text-gray-400 text-center mt-8">Asnjë porosi ende...</p>
            ) : (
              order.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeItem(item.id)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-red-200 text-sm">−</button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <button onClick={() => addItem(item)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-green-200 text-sm">+</button>
                    <span className="text-gray-500 text-sm w-16 text-right">{(item.price * item.qty).toFixed(2)}€</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg mb-3">
              <span>Totali</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <button
              onClick={() => onPay(table.id)}
              disabled={order.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-all"
            >
              Paguaj
            </button>
          </div>
        </div>

        {/* E djathta — Menyja */}
        <div className="w-1/2 p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Menyja</h2>
          
          {/* Kategorite */}
          <div className="flex gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Produktet */}
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {filtered.map(product => (
              <button
                key={product.id}
                onClick={() => addItem(product)}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-all"
              >
                <p className="font-medium">{product.name}</p>
                <p className="text-green-600 font-bold">{product.price.toFixed(2)}€</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}