import React from 'react';
import Link from 'next/link';
import { TimelineEvent, getTimelineIcon } from '@/lib/mockData/timeline';
import { Clock } from 'lucide-react';

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500 text-lg">No recent activity on your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="relative border-l-4 border-gray-200 pl-6 space-y-8">
      {events.map((event, index) => {
        const { icon: Icon, color, bgColor } = getTimelineIcon(event.type);
        const timeAgo = formatTimeAgo(event.timestamp);

        return (
          <div key={event.id} className="relative group">
            
            {/* Timeline Dot/Icon */}
            <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center ${bgColor} ${color} border-4 border-white shadow-md`}>
              <Icon className="w-3 h-3" />
            </div>

            {/* Content Card */}
            <Link 
              href={event.link || '#'}
              className={`block bg-white rounded-xl p-4 transition duration-200 border border-gray-100 
                ${event.isHighPriority ? 'shadow-xl hover:shadow-2xl border-teal-300' : 'shadow-md hover:shadow-lg'}
              `}
            >
              <div className="flex justify-between items-start">
                {/* Title and Description */}
                <div>
                  <h4 className={`font-bold ${event.isHighPriority ? 'text-teal-700' : 'text-gray-900'}`}>
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                </div>

                {/* Timestamp */}
                <div className="flex items-center text-xs text-gray-500 flex-shrink-0 ml-4 pt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {timeAgo}
                </div>
              </div>
              
              {event.link && (
                  <p className="mt-2 text-xs text-blue-500 hover:text-blue-700 font-medium">
                      View Details &rarr;
                  </p>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};