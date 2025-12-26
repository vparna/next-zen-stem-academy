import { NextRequest, NextResponse } from 'next/server';
import { getAllCourses, getCoursesByCategory } from '@/models/Course';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    let courses;
    if (category) {
      courses = await getCoursesByCategory(category);
    } else {
      courses = await getAllCourses(true);
    }
    
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
