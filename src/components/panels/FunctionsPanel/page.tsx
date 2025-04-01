"use client";
import React, { JSX, useState } from "react";
import {
    AlertCircle, AlertTriangle, Calendar, Check, CheckCircle, ChevronDown, ChevronRight,
    Code, FormInput, List, Minus, MousePointer, Plus, Repeat, Search, Shuffle,
    Square, StickyNote, ToggleRight, ChevronLeft
} from "lucide-react";

// Separated categories data (can be moved to a separate file later)
const sidebarCategories: (Category | Item)[] = [
    {
        icon: <Calendar className="w-4 h-4 text-black" />,
        items: [
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Full Date - 7th March 2025" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Full Date - 07/03/2025" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Full Date - March" }
        ],
        title: "Date"
    },
    { icon: <Plus className="w-4 h-4 text-black" />, name: "Add" },
    { icon: <Minus className="w-4 h-4 text-black" />, name: "Sub" },
    { icon: <Square className="w-4 h-4 text-black" />, name: "Square" },
    { icon: <FormInput className="w-4 h-4 text-black" />, name: "Input Form" },
    { icon: <FormInput className="w-4 h-4 text-black" />, name: "Para Form" },
    { icon: <Calendar className="w-4 h-4 text-black" />, name: "Date picker" },
    { icon: <Calendar className="w-4 h-4 text-black" />, name: "Year picker" },
    { icon: <Calendar className="w-4 h-4 text-black" />, name: "Month picker" },
    { icon: <List className="w-4 h-4 text-black" />, name: "Dropdown menu" },
    { icon: <Check className="w-4 h-4 text-black" />, name: "Check list" },
    { icon: <ToggleRight className="w-4 h-4 text-black" />, name: "Toggle button" },
    { icon: <Repeat className="w-4 h-4 text-black" />, name: "Loop" },
    { icon: <Code className="w-4 h-4 text-black" />, name: "If-Else condition" },
    { icon: <Shuffle className="w-4 h-4 text-black" />, name: "Random Value" },
    { icon: <StickyNote className="w-4 h-4 text-black" />, name: "Notes" },
    { icon: <AlertCircle className="w-4 h-4 text-black" />, name: "Error message" },
    { icon: <CheckCircle className="w-4 h-4 text-black" />, name: "Success notification" },
    { icon: <AlertTriangle className="w-4 h-4 text-black" />, name: "Warning Alert" },
    { icon: <MousePointer className="w-4 h-4 text-black" />, name: "Cursor" }
];

// Type definitions for scalability
interface Item {
    icon: JSX.Element;
    name: string;
}

interface Category {
    icon: JSX.Element;
    items: Item[];
    title: string;
}

function RightSidebar() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    const filteredCategories = sidebarCategories.filter((category) =>
        "name" in category
            ? category.name.toLowerCase().includes(search.toLowerCase())
            : category.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed top-0 right-0 h-screen flex">
            {/* Collapsed State */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="p-2 mt-20 h-[80%] rounded-l-lg shadow-lg bg-white hover:bg-black/10 transition-all duration-300"
                >
                    <ChevronLeft size={24} className="text-black" />
                </button>
            )}

            {/* Expanded State */}
            {!isCollapsed && (
                <aside className="w-62 bg-white mt-[80px] h-[calc(100vh-80px)] border-l border-black/20 rounded-l-xl p-4 flex flex-col shadow-lg transition-all duration-300">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-black/20 pb-3 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-black/80" />
                            <input
                                className="pl-10 p-2 w-full border border-black/20 rounded-md text-black focus:ring focus:ring-black/30 placeholder:text-black/50 bg-white transition-all duration-200"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                type="text"
                            />
                        </div>
                        <ChevronLeft
                            className="w-4 h-4 rotate-180 text-black cursor-pointer ml-2"
                            onClick={toggleCollapse}
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-white space-y-2">
                        {filteredCategories.map((category, index) => (
                            <div key={index} className="border-b border-black/10 pb-2">
                                {"items" in category ? (
                                    <>
                                        <button
                                            className="flex justify-between items-center w-full text-left text-black p-2 hover:bg-black/5 rounded transition-colors duration-200"
                                            onClick={() => toggleCategory(category.title)}
                                        >
                                            <div className="flex items-center gap-2">
                                                {category.icon}
                                                <span>{category.title}</span>
                                            </div>
                                            {openCategory === category.title ? (
                                                <ChevronDown className="w-4 h-4 text-black" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-black" />
                                            )}
                                        </button>

                                        {/* Sub-items with smooth animation */}
                                        <div
                                            className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                                                openCategory === category.title ? "max-h-96" : "max-h-0"
                                            }`}
                                        >
                                            {category.items.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center space-x-2 p-2 hover:bg-black/5 rounded cursor-pointer transition-colors duration-200"
                                                >
                                                    {item.icon}
                                                    <span className="text-black">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center text-sm gap-2 p-2 hover:bg-black/5 rounded cursor-pointer transition-colors duration-200">
                                        {category.icon}
                                        <span className="text-black">{category.name}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            )}
        </div>
    );
}

export default RightSidebar;