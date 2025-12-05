"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";


export default function AdmissionForm() {
   const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    // Auto +88 for Bangladesh numbers
    ["phone_number", "guardian_phone_number"].forEach((key) => {
      if (data[key]?.startsWith("0")) {
        data[key] = "+88" + data[key].slice(1);
      }
    });

    try {
      const res = await fetch("https://jamiatussunnah.onrender.com/admission/apply/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("Form submitted successfully!");
      e.target.reset();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const isRTL = i18n.language === "ar";


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-medium">
            {t('name')}
          </label>
          <input name="name" required className="w-full border rounded px-3 py-2" />
        </div>


 {/* Birth Date */}
        <div>
          <label className="block mb-1 font-medium">
            {t('birth_date')}
          </label>
          <input
            type="date"
            name="birth_date"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Birth/NID */}
        <div>
          <label className="block mb-1 font-medium">
            {t('birth_or_nid_card_no')}
          </label>
          <input
            name="birth_or_nid_card_no"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Father Name */}
        <div>
          <label className="block mb-1 font-medium">
            {t('father_name')}
          </label>
          <input name="father_name" required className="w-full border rounded px-3 py-2" />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 font-medium">
            {t('occupation')}
          </label>
          <input name="occupation" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Mother Name */}
        <div>
          <label className="block mb-1 font-medium">
            {t('mather_name')}
          </label>
          <input name="mather_name" required className="w-full border rounded px-3 py-2" />
        </div>

        {/* Father/Mother NID */}
        <div>
          <label className="block mb-1 font-medium">
            {t('father_or_mather_nid_no')}
          </label>
          <input
            name="father_or_mather_nid_no"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Phone */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-medium">
            {t('phone_number')}
          </label>
          <input name="phone_number" required className="w-full border rounded px-3 py-2" />
        </div>

        {/* Permanent Address */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {t('permanent_address')}
          </h2>
        </div>

        <div>
          <label className="block mb-1">
            {t('permanent_address_village')}
          </label>
          <input name="permanent_address_village" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('permanent_address_post_office')}
          </label>
          <input name="permanent_address_post_office" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('permanent_address_Upazila')}
          </label>
          <input name="permanent_address_Upazila" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('permanent_address_district')}
          </label>
          <input name="permanent_address_district" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Current Address */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {t('current_address')}
          </h2>
        </div>

        <div>
          <label className="block mb-1">
            {t('current_address_village')}
          </label>
          <input name="current_address_village" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('current_address_post_office')}
          </label>
          <input name="current_address_post_office" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('current_address_Upazila')}
          </label>
          <input name="current_address_Upazila" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('current_address_district')}
          </label>
          <input name="current_address_district" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Guardian Info */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {t('guardian_info')}
          </h2>
        </div>

        <div>
          <label className="block mb-1">
            {t('guardian_name')}
          </label>
          <input name="guardian_name" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('guardian_phone_number')}
          </label>
          <input name="guardian_phone_number" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1">
            {t('guardian_address')}
          </label>
          <input name="guardian_address" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Education */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {t('education')}
          </h2>
        </div>

        <div>
          <label className="block mb-1">
            {t('Previous_class')}
          </label>
          <input name="Previous_class" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">
            {t('Where_read')}
          </label>
          <input name="Where_read" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1">
            {t('current_class')}
          </label>
          <input name="current_class" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : t('login')}
          </button>
        </div>
      </form>
    </div>
  );
}
