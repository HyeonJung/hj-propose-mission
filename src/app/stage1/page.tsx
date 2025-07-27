'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Stage1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-center items-center px-6 py-20 text-lg tracking-wide space-y-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        2019년 8월, 여름...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        오늘도 어김없이 난 오아시스로 출근을 한다.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
      >
        장지 물류센터, 따가운 햇살, 그리고 반복되는 하루.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 7 }}
      >
        오늘도 열심히 일해보자!
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 9 }}
        onClick={() => router.push('/stage1/step1')}
        className="mt-10 px-6 py-3 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
      >
        사무실 들어가기
      </motion.button>
    </div>
  );
}