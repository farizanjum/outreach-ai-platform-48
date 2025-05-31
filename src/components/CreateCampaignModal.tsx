
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateCampaignModalProps {
  onClose: () => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    platform: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating campaign:', formData);
    // Here you would typically send the data to your backend
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="campaignName">Campaign Name</Label>
          <Input
            id="campaignName"
            placeholder="Enter campaign name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="10000"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your campaign objectives and requirements"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select onValueChange={(value) => handleInputChange('platform', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food & Dining</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          Create Campaign
        </Button>
      </div>
    </form>
  );
};

export default CreateCampaignModal;
