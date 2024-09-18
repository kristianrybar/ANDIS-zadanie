import { useState } from "react";

// Pomocná funkcia na odstránenie diakritiky
const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Pomocná funkcia na zvýraznenie textu
const highlightSearchedText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text

    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
        removeDiacritics(part.toLowerCase()) === removeDiacritics(searchTerm.toLowerCase())
            ? <span key={index} style={{ backgroundColor: 'orange' }}>{part}</span>
            : part
    )
}

// Definícia typu objektu
type Item = {
    id: number;
    name: string;
    description: string;
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Pole objektov
    const items: Item[] = [
        { id: 1, name: "hruška", description: "Ovocie s diakritikou" },
        { id: 2, name: "banán", description: "Tropické ovocie" },
        { id: 3, name: "pomaranč", description: "Citrusový plod" },
        { id: 4, name: "sršanie", description: "Zvuk bzučiaceho hmyzu" }
    ];

    // Filtrovanie objektov na základe vstupu, ignorujúc diakritiku
    const filteredItems = items.filter(item =>
        removeDiacritics(item.name.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase())) ||
        removeDiacritics(item.description.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
    );

    return (
        <div className='w-full p-3'>
            <input
                type="text"
                placeholder="Hľadať..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <strong>{highlightSearchedText(item.name, searchTerm)}</strong> - {highlightSearchedText(item.description, searchTerm)}
                    </li>
                ))}
            </ul>

            <div className="flex mb-4">
                <div className="w-full bg-gray-500 h-12"></div>
            </div>

        
            <div className="flex mb-4">
                <div className="w-1/2 bg-gray-400 h-12"></div>
                <div className="w-1/2 bg-gray-500 h-12"></div>
            </div>

            <div className="flex mb-4">
                <div className="w-1/3 bg-gray-400 h-12"></div>
                <div className="w-1/3 bg-gray-500 h-12"></div>
                <div className="w-1/3 bg-gray-400 h-12"></div>
            </div>

        
            <div className="flex mb-4">
                <div className="w-1/4 bg-gray-500 h-12"></div>
                <div className="w-1/4 bg-gray-400 h-12"></div>
                <div className="w-1/4 bg-gray-500 h-12"></div>
                <div className="w-1/4 bg-gray-400 h-12"></div>
            </div>

            
            <div className="flex mb-4">
                <div className="w-1/5 bg-gray-500 h-12"></div>
                <div className="w-1/5 bg-gray-400 h-12"></div>
                <div className="w-1/5 bg-gray-500 h-12"></div>
                <div className="w-1/5 bg-gray-400 h-12"></div>
                <div className="w-1/5 bg-gray-500 h-12"></div>
            </div>

            
            <div className="flex gap-2">
                <div className="w-1/6 bg-gray-400 h-12"></div>
                <div className="w-1/6 bg-gray-500 h-12"></div>
                <div className="w-1/6 bg-gray-400 h-12"></div>
                <div className="w-1/6 bg-gray-500 h-12"></div>
                <div className="w-1/6 bg-gray-400 h-12"></div>
                <div className="w-1/6 bg-gray-500 h-12"></div>
            </div>
        </div>
    );
};

export default App;
