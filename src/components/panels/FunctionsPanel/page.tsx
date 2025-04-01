"use client";
import React, { JSX, useState } from "react";
import {
    AlertCircle, AlertTriangle, Calendar, Check, CheckCircle, Code, FormInput,
    List, Minus, MousePointer, Plus, Repeat, Search, Shuffle, Square, StickyNote,
    ToggleRight, ChevronLeft, Star, Zap, PenTool, Bell, Clock, Sliders
} from "lucide-react";

// Type definitions
interface Item {
    icon: JSX.Element;
    name: string;
}

interface Category {
    icon: JSX.Element;
    title: string;
    items: Item[];
}

// Updated categories with more dummy data
const sidebarCategories: Category[] = [
    {
        icon: <Star className="w-4 h-4 text-black" />,
        title: "Most Frequently Used",
        items: [
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Date picker" },
            { icon: <FormInput className="w-4 h-4 text-black" />, name: "Input Form" },
            { icon: <Check className="w-4 h-4 text-black" />, name: "Check list" },
            { icon: <ToggleRight className="w-4 h-4 text-black" />, name: "Toggle button" },
        ],
    },
    {
        icon: <Zap className="w-4 h-4 text-black" />,
        title: "Basic",
        items: [
            { icon: <Plus className="w-4 h-4 text-black" />, name: "Add" },
            { icon: <Minus className="w-4 h-4 text-black" />, name: "Subtract" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Square" },
            { icon: <Shuffle className="w-4 h-4 text-black" />, name: "Randomize" },
            { icon: <Repeat className="w-4 h-4 text-black" />, name: "Repeat" },
        ],
    },
    {
        icon: <Calendar className="w-4 h-4 text-black" />,
        title: "Dates",
        items: [
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Full Date - 7th March 2025" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Short Date - 07/03/25" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Month - March" },
            { icon: <Clock className="w-4 h-4 text-black" />, name: "Time Picker" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Year Selector" },
            { icon: <Calendar className="w-4 h-4 text-black" />, name: "Week Planner" },
        ],
    },
    {
        icon: <FormInput className="w-4 h-4 text-black" />,
        title: "Forms",
        items: [
            { icon: <FormInput className="w-4 h-4 text-black" />, name: "Text Input" },
            { icon: <FormInput className="w-4 h-4 text-black" />, name: "Paragraph Field" },
            { icon: <List className="w-4 h-4 text-black" />, name: "Dropdown Menu" },
            { icon: <ToggleRight className="w-4 h-4 text-black" />, name: "Switch Toggle" },
            { icon: <CheckCircle className="w-4 h-4 text-black" />, name: "Checkbox" },
            { icon: <Sliders className="w-4 h-4 text-black" />, name: "Range Slider" },
        ],
    },
    {
        icon: <Code className="w-4 h-4 text-black" />,
        title: "Plugins",
        items: [
            { icon: <Repeat className="w-4 h-4 text-black" />, name: "Loop Function" },
            { icon: <Code className="w-4 h-4 text-black" />, name: "Conditional Block" },
            { icon: <Shuffle className="w-4 h-4 text-black" />, name: "Random Generator" },
            { icon: <PenTool className="w-4 h-4 text-black" />, name: "Custom Script" },
            { icon: <Zap className="w-4 h-4 text-black" />, name: "API Connector" },
        ],
    },
    {
        icon: <Bell className="w-4 h-4 text-black" />,
        title: "Notifications",
        items: [
            { icon: <AlertCircle className="w-4 h-4 text-black" />, name: "Error Alert" },
            { icon: <CheckCircle className="w-4 h-4 text-black" />, name: "Success Message" },
            { icon: <AlertTriangle className="w-4 h-4 text-black" />, name: "Warning Popup" },
            { icon: <Bell className="w-4 h-4 text-black" />, name: "Info Toast" },
        ],
    },
    {
        icon: <MousePointer className="w-4 h-4 text-black" />,
        title: "Others",
        items: [
            { icon: <StickyNote className="w-4 h-4 text-black" />, name: "Sticky Note" },
            { icon: <MousePointer className="w-4 h-4 text-black" />, name: "Custom Cursor" },
            { icon: <PenTool className="w-4 h-4 text-black" />, name: "Drawing Tool" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Divider" },
            { icon: <List className="w-4 h-4 text-black" />, name: "Bullet List" },
            { icon: <Clock className="w-4 h-4 text-black" />, name: "Timer" },
            { icon: <Sliders className="w-4 h-4 text-black" />, name: "Adjuster" },
        ],
    },
];

function RightSidebar() {
    const [search, setSearch] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    const filteredCategories = sidebarCategories.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        ),
    })).filter((category) =>
        category.items.length > 0 || category.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed top-0 right-0 h-screen flex">
            {/* Collapsed State */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="p-2 mt-20 h-[80%] rounded-l-lg bg-white/80 backdrop-blur-md shadow-lg hover:bg-black/10 transition-all duration-300 ease-in-out"
                >
                    <ChevronLeft size={24} className="text-black" />
                </button>
            )}

            {/* Expanded State */}
            {!isCollapsed && (
                <aside className="w-72 bg-white/80 backdrop-blur-md mt-[80px] h-[calc(100vh-80px)] border-l border-black/20 rounded-l-xl p-4 flex flex-col shadow-xl transition-all duration-300">
                    {/* Sticky Search Panel */}
                    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md pb-4 border-b border-black/20">
                        <div className="flex justify-between items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-black/80" />
                                <input
                                    className="pl-10 p-2 w-full border border-black/20 rounded-md text-black focus:ring-2 focus:ring-black/30 placeholder:text-black/50 bg-white/50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tools..."
                                    type="text"
                                />
                            </div>
                            <ChevronLeft
                                className="w-5 h-5 rotate-180 text-black cursor-pointer ml-3 hover:text-black/70 transition-all duration-200 ease-in-out transform hover:scale-110"
                                onClick={toggleCollapse}
                            />
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent pt-4">
                        {filteredCategories.map((category, index) => (
                            <div key={index} className="mb-6">
                                {/* Sticky Section Header */}
                                <div className="sticky top-0.5 z-10 bg-white/95 backdrop-blur-md py-2 border-b border-black/10">
                                    <div className="flex items-center gap-2 text-black font-semibold text-sm">
                                        {category.icon}
                                        <span>{category.title}</span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="mt-2 space-y-1">
                                    {category.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-3 p-3 hover:bg-black/10 rounded-md cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm"
                                        >
                                            {item.icon}
                                            <span className="text-black text-sm">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            )}
        </div>
    );
}

export default RightSidebar;