"use client";

import React, { JSX, useState } from "react";

import {
    AlertCircle, NotebookPen, Calendar, SquareSigma, CheckCircle, Code, FormInput,
    List, Drill, Ban, Split, Repeat, Search, Shuffle, Square, Globe,
    ToggleRight, ChevronLeft, Star, Zap, PenTool, Bell, Clock, Sliders, PanelRightClose,ClipboardList,TextCursor, TextCursorInput, CalendarCog, MousePointerClick, Keyboard, Image, Timer, User, Mail, Phone, MapPin
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
        items: [],
    },
    {
        icon: <Drill className="w-4 h-4 text-black" />,
        title: "Tools",
        items: [
            { icon: <ClipboardList className="w-4 h-4 text-black" />, name: "Clipboard" },
            { icon: <TextCursor className="w-4 h-4 text-black" />, name: "Cursor" },
            { icon: <Shuffle className="w-4 h-4 text-black" />, name: "Random Value Generator" },
            { icon: <MousePointerClick className="w-4 h-4 text-black" />, name: "Mouse Click" },
            { icon: <Keyboard className="w-4 h-4 text-black" />, name: "Button Press" },
            { icon: <Timer className="w-4 h-4 text-black" />, name: "Delay Timer" },
        ],
    },
    {
        icon: <User className="w-4 h-4 text-black" />,
        title: "User Data",
        items: [
            { icon: <User className="w-4 h-4 text-black" />, name: "Name" },
            { icon: <User className="w-4 h-4 text-black" />, name: "First Name" },
            { icon: <User className="w-4 h-4 text-black" />, name: "Last Name" },
            { icon: <Mail className="w-4 h-4 text-black" />, name: "Email" },
            { icon: <Phone className="w-4 h-4 text-black" />, name: "Phone" },
            { icon: <MapPin className="w-4 h-4 text-black" />, name: "Address" },

        ],
    },
    {
        icon: <FormInput className="w-4 h-4 text-black" />,
        title: "Forms",
        items: [
            { icon: <FormInput className="w-4 h-4 text-black" />, name: "Text Input" },
            { icon: <TextCursorInput className="w-4 h-4 text-black" />, name: "Paragraph" },
            { icon: <List className="w-4 h-4 text-black" />, name: "Dropdown Menu" },
            { icon: <ToggleRight className="w-4 h-4 text-black" />, name: "Switch Toggle" },
            { icon: <CalendarCog className="w-4 h-4 text-black" />, name: "Date Form" },
            { icon: <Image className="w-4 h-4 text-black" />, name: "Image Form" },
        ],
    },
    {
        icon: <Code className="w-4 h-4 text-black" />,
        title: "Plugins",
        items: [
            { icon: <Repeat className="w-4 h-4 text-black" />, name: "Loop" },
            { icon: <Split className="w-4 h-4 text-black" />, name: "Condition" },

            { icon: <PenTool className="w-4 h-4 text-black" />, name: "Variables" },
            { icon: <Globe className="w-4 h-4 text-black" />, name: "Send Data" },
            { icon: <Zap className="w-4 h-4 text-black" />, name: "Receive Data" },
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
        icon: <Bell className="w-4 h-4 text-black" />,
        title: "Messages",
        items: [
            { icon: <Ban className="w-4 h-4 text-black" />, name: "Error Alert" },
            { icon: <NotebookPen className="w-4 h-4 text-black" />, name: "Notes" },

        ],
    },
    {
        icon: <SquareSigma className="w-4 h-4 text-black" />,
        title: "Math",
        items: [
            { icon: <Square className="w-4 h-4 text-black" />, name: "Square Root" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Square" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Cube" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Cube Root" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Power" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Logarithm" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Factorial" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Pi" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Euler's Number" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Golden Ratio" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Fibonacci Sequence" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Prime Number" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Random Number" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Arithmetic Operations" },
            { icon: <Square className="w-4 h-4 text-black" />, name: "Trigonometric Functions" },
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
        <div className="top-0 right-0 h-screen flex">
            {/* Collapsed State */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="p-2 mt-20 bg-gray-200 h-3/5 rounded-l-lg backdrop-blur-md shadow-lg hover:bg-black/10 transition-all duration-300 ease-in-out"
                >
                    <ChevronLeft size={24} className="text-black" />
                </button>
            )}

            {/* Expanded State */}
            {!isCollapsed && (
                <aside className="w-72 h-full border-l border-black/20 p-4 flex flex-col shadow-xl">
                    {/* Sticky Search Panel */}
                    <div className="sticky top-0 bg-white/90 rounded-md backdrop-blur-md border-b border-black/20">
                        <div className="flex justify-between items-center">
                            <PanelRightClose scale={5}
                                className="m-5 text-slate-400 cursor-pointer ml-3 hover:text-black/70 transition-all duration-200 ease-in-out transform"
                                onClick={toggleCollapse}
                            />
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-black/80" />
                                <input
                                    className="pl-10 p-2 w-full border border-black/20 rounded-md text-black focus:ring-2 focus:ring-black/30 placeholder:text-black/50 bg-white/50 transition-all duration-200 ease-in-out transform"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tools..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent">
                        {filteredCategories.map((category, index) => (
                            <div key={index} className="mb-6">
                                {/* Sticky Section Header */}
                                <div className="sticky top-0.5 z-20 backdrop-blur-mdborder-b border-black/10 px-2 py-3 rounded-md bg-slate-100">
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