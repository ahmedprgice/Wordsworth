import { X, Award, BookOpen, Globe, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface Teacher {
  id: number;
  name: string;
  title: string;
  photo: string;
  specialization: string;
  experience: string;
  qualifications: string[];
  teachingStyle: string;
  availability: string;
  languages: string[];
  bio: string;
}

interface TeacherModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherModal({ teacher, isOpen, onClose }: TeacherModalProps) {
  if (!teacher) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 bg-white/10">
                        <img
                          src={teacher.photo}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(teacher.name) + '&size=200&background=3B82F6&color=fff&bold=true';
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-brand-orange rounded-full p-2">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl mb-2 text-white">{teacher.name}</h2>
                      <p className="text-blue-100 text-lg mb-3">{teacher.title}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {teacher.specialization}
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {teacher.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-brand-blue" />
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-brand-blue" />
                      Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {teacher.qualifications.map((qual, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <Globe className="w-5 h-5 text-brand-blue" />
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {teacher.languages.map((lang, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-brand-blue rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-brand-blue" />
                        Availability
                      </h3>
                      <p className="text-gray-700">{teacher.availability}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="mb-3">Teaching Style</h3>
                    <p className="text-gray-700">{teacher.teachingStyle}</p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="primary" className="flex-1">
                      Book a Trial Class
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
