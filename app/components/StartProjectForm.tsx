'use client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useApi } from '../context/ApiContext';

type Service = { id: number; name: string };
type Props = { services: Service[]; cities: string[] };

export default function StartProjectForm({ services, cities }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    serviceId: '',
    apartmentType: '',
    apartmentSize: '',
    preferredStyle: '',
    materialQuality: '',
    minBudget: '',
    maxBudget: '',
    city: '',
    details: '',
    images: [] as File[],
  });
  const { baseUrl } = useApi();

  const handleNext = async () => {
    setErrorMessage('');
    if (step === 1 && (!form.name || !form.serviceId)) {
      setErrorMessage('Please complete all required fields in Step 1.');
      return;
    }
    if (step === 2 && (!form.minBudget || !form.maxBudget)) {
      setErrorMessage('Please complete all required fields in Step 2.');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Please login first.');
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append('Name', form.name);
      formData.append('ServiceId', form.serviceId);
      formData.append('ApartmentType', form.apartmentType);
      formData.append('ApartmentSize', form.apartmentSize);
      formData.append('PreferredStyle', form.preferredStyle);
      formData.append('MaterialQuality', form.materialQuality);
      formData.append('MinBudget', form.minBudget);
      formData.append('MaxBudget', form.maxBudget);
      formData.append('Details', form.details);
      form.images.forEach((img) => formData.append('ImageFiles', img));

      try {
        const res = await fetch(`${baseUrl}/api/Projects`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Upload failed');
        }

        router.push('/projects');
      } catch (err: any) {
        console.error('Error:', err);
        setErrorMessage('Failed to create project. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((f) => ({ ...f, images: Array.from(e.target.files) }));
    }
  };

  const SelectField = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    options: string[] | { id: number; name: string }[];
    onChange: (value: string) => void;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg flex justify-between items-center hover:border-gray-400 transition-colors"
        >
          {value || <span className="text-gray-400">{label}</span>} 
          <ChevronDown className="w-5 h-5" />
        </button>
        {open && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-20 max-h-72 overflow-y-auto">
            {(options as any[]).map((option, index) => {
              const label = typeof option === 'string' ? option : option.name;
              const val = typeof option === 'string' ? option : option.id.toString();
              return (
                <li
                  key={index}
                  onClick={() => {
                    onChange(val);
                    setOpen(false);
                  }}
                  className="px-5 py-3 text-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const spaceTypes = ['Apartment', 'Villa', 'Studio', 'Office', 'Duplex'];
  const finishStyles = ['Modern', 'Classic', 'Minimalist', 'Industrial', 'Bohemian'];
  const qualityLevels = ['High Quality', 'Medium Quality', 'Economy Quality'];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handleBack} 
            disabled={step === 1}
            className={`p-2 rounded-full ${step === 1 ? 'text-gray-300' : 'text-black hover:bg-gray-100'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-center font-bold text-xl flex-1">Start a New Project</h2>
          <button 
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-gray-100 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`h-2 mb-3 rounded-full ${step >= i ? 'bg-green-500' : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Project name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg hover:border-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
              <SelectField
                label="Select Service"
                value={services.find((s) => s.id.toString() === form.serviceId)?.name || ''}
                options={services}
                onChange={(val) => setForm((f) => ({ ...f, serviceId: val }))}
              />
              <SelectField
                label="Select Space Type"
                value={form.apartmentType}
                options={spaceTypes}
                onChange={(val) => setForm((f) => ({ ...f, apartmentType: val }))}
              />
              <input
                type="text"
                placeholder="Apartment Size (e.g., 120 sqm)"
                value={form.apartmentSize}
                onChange={(e) => setForm((f) => ({ ...f, apartmentSize: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg hover:border-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </>
          )}
          {step === 2 && (
            <>
              <SelectField
                label="Select Finish Style"
                value={form.preferredStyle}
                options={finishStyles}
                onChange={(val) => setForm((f) => ({ ...f, preferredStyle: val }))}
              />
              <SelectField
                label="Select Quality Level"
                value={form.materialQuality}
                options={qualityLevels}
                onChange={(val) => setForm((f) => ({ ...f, materialQuality: val }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min Budget (EGP)"
                  value={form.minBudget}
                  onChange={(e) => setForm((f) => ({ ...f, minBudget: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg hover:border-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Max Budget (EGP)"
                  value={form.maxBudget}
                  onChange={(e) => setForm((f) => ({ ...f, maxBudget: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg hover:border-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <SelectField
                label="Select City"
                value={form.city}
                options={cities}
                onChange={(val) => setForm((f) => ({ ...f, city: val }))}
              />
              <textarea
                placeholder="Additional notes (optional)"
                value={form.details}
                onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-5 py-4 text-lg h-32 resize-none hover:border-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={onImagesChange} 
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                    <p className="text-lg text-gray-600">Click to upload images</p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                  </div>
                </label>
                {form.images.length > 0 && (
                  <p className="mt-3 text-green-600">{form.images.length} file(s) selected</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Next / Finish Button */}
        <button
          onClick={handleNext}
          disabled={loading}
          className={`w-full py-5 rounded-xl mt-8 text-white text-xl font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
            </span>
          ) : step < 3 ? (
            'Continue'
          ) : (
            'Submit Project'
          )}
        </button>

        {/* Error message */}
        {errorMessage && (
          <p className="mt-4 text-center text-red-600 text-lg">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}